// Runs the ACTUAL calculator script out of academic-index.astro against a DOM
// stub, so the parity check exercises shipped code rather than a copy of it.
// Reads a JSON array of cases on argv[2]; prints one result object per case.
import fs from 'node:fs';

const page  = fs.readFileSync('src/pages/academic-index.astro', 'utf8');
const model = JSON.parse(fs.readFileSync('src/data/academic-model.json', 'utf8'));

const m = page.match(/<script define:vars=\{\{ model \}\}>([\s\S]*?)<\/script>/);
if (!m) { console.error('could not find the calculator script'); process.exit(1); }

function el(extra = {}) {
  return {
    value: 0, textContent: '', innerHTML: '', hidden: false, disabled: false,
    min: 0, max: 0, step: 1,
    style: {}, classList: { add(){}, remove(){}, toggle(){} },
    setAttribute(){}, getAttribute(){ return null; },
    closest(){ return el(); }, querySelector(){ return el(); },
    addEventListener(){},
    ...extra,
  };
}

const nodes = {};
['f-gpa','f-test','f-ap','f-hon','v-gpa','v-test','v-ap','v-hon',
 'g-num','g-read','g-fill','ca-score','l-test','e-test',
 'v-chip','v-why','v-pct','v-incl','v-excl','v-pair','bl-test','h-num']
  .forEach(id => nodes[id] = el());

let onInput = null;
nodes['ai-form'] = el({ addEventListener: (evt, fn) => { if (evt === 'input') onInput = fn; } });

// Each bar row needs its own <i> and .bar-v so widths/values don't collide.
const barRows = ['gpa','test'].map(k => {
  const inner = el(), val = el();
  return el({
    getAttribute: () => k,
    querySelector: sel => (sel === '.bar-t i' ? inner : val),
  });
});

const segClicks = {};
const segButtons = ['sat','act','none'].map(kind => {
  const b = el({ getAttribute: () => kind });
  b.addEventListener = (evt, fn) => { if (evt === 'click') segClicks[kind] = fn; };
  return b;
});

globalThis.document = {
  getElementById: id => nodes[id] || null,
  querySelectorAll: sel => {
    if (sel === '.bar-row') return barRows;
    if (sel === '.seg-b')   return segButtons;
    return [];
  },
};

new Function('model', m[1])(model);
if (!onInput) { console.error('script never registered an input handler'); process.exit(1); }

const cases = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const out = cases.map(c => {
  // Flip the SAT / ACT / no-score segment first: its handler resets the slider
  // bounds and value, so the case's own numbers have to be written after it.
  segClicks[c.mode]();
  nodes['f-gpa'].value  = c.gpa;
  nodes['f-test'].value = c.test == null ? 0 : c.test;
  nodes['f-ap'].value   = c.ap;
  nodes['f-hon'].value  = c.hon;
  onInput();
  return {
    ai:        parseFloat(nodes['g-num'].textContent),
    band:      nodes['g-read'].textContent,
    chip:      nodes['v-chip'].textContent,
    percentile: nodes['v-pct'].innerHTML,
    inclusive: nodes['v-incl'].textContent,
    exclusive: nodes['v-excl'].textContent,
    holistic:  parseFloat(nodes['h-num'].textContent),
  };
});
console.log(JSON.stringify(out));
