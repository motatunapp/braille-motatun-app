const brailleMap = {
  100000: "a",
  101000: "b",
  110000: "c",
  110100: "d",
  100100: "e",
  111000: "f",
  111100: "g",
  101100: "h",
  "011000": "i",
  "011100": "j",
  100010: "k",
  101010: "l",
  110010: "m",
  110110: "n",
  100110: "o",
  111010: "p",
  111110: "q",
  101110: "r",
  "011010": "s",
  "011110": "t",
  100011: "u",
  101011: "v",
  "011101": "w",
  110011: "x",
  110111: "y",
  100111: "z",
};


let sound = {
  a: new Audio("/src/huruf_a.mp3"),
  b: new Audio("/src/huruf_b.mp3"),
  c: new Audio("/src/huruf_c.mp3"),
  d: new Audio("/src/huruf_d.mp3"),
  e: new Audio("/src/huruf_e.mp3"),
  f: new Audio("/src/huruf_f.mp3"),
  g: new Audio("/src/huruf_g.mp3"),
  h: new Audio("/src/huruf_h.mp3"),
  i: new Audio("/src/huruf_i.mp3"),
  j: new Audio("/src/huruf_j.mp3"),
  k: new Audio("/src/huruf_k.mp3"),
  l: new Audio("/src/huruf_l.mp3"),
  m: new Audio("/src/huruf_m.mp3"),
  n: new Audio("/src/huruf_n.mp3"),
  o: new Audio("/src/huruf_o.mp3"),
  p: new Audio("/src/huruf_p.mp3"),
  q: new Audio("/src/huruf_q.mp3"),
  r: new Audio("/src/huruf_r.mp3"),
  s: new Audio("/src/huruf_s.mp3"),
  t: new Audio("/src/huruf_t.mp3"),
  u: new Audio("/src/huruf_u.mp3"),
  v: new Audio("/src/huruf_v.mp3"),
  w: new Audio("/src/huruf_w.mp3"),
  x: new Audio("/src/huruf_x.mp3"),
  y: new Audio("/src/huruf_y.mp3"),
  z: new Audio("/src/huruf_z.mp3"),
};

let tampilkan = document.getElementById("output");
let kata;
let huruf;
let huruf2;
let text = [0, 0, 0, 0, 0, 0];

let buttons = document.querySelectorAll(".button");
let btnSpace = document.querySelector(".space");
let btnDelete = document.querySelector(".delete");
let btnShift = document.querySelector(".shift");
let btnSend = document.querySelector(".send-button");
let a = 0;

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    var soundclk = new Audio("/src/click2.mp3");  
    soundclk.play();
    
    let index = button.value;
    text[index] = 1;
    
    setTimeout(() => {
      kata = text.join("");

      if (kata in brailleMap) {
        huruf = brailleMap[kata];
        tampilkan.innerHTML += huruf;
        sound[huruf].play();
        huruf2 = tampilkan.innerHTML.toString();
        console.log(huruf2);
        console.log(typeof(huruf2));
      }
      return (text = [0, 0, 0, 0, 0, 0]);
    }, 1000); 
    
    return huruf2;
  });
  
});

btnSend.addEventListener("click", async function (e) {
  e.preventDefault();
  var soundclk = new Audio("/src/click2.mp3");  
  soundclk.play();

  if (huruf2 == '') {return};
  const res = await fetch('/post', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      obj: huruf2
    })
  }).then(() => {
    alert('Email Terkirim');
  }).catch(() => {
    console.log('error');
  })
  
  window.location.replace('/');
})

btnSpace.addEventListener("click", function() {
  var soundclk = new Audio("/src/click2.mp3");   
  soundclk.play();
  tampilkan.innerHTML += " ";
  huruf2 = tampilkan.innerHTML
})

btnSpace.addEventListener("dblclick", function () {
  var soundclk = new Audio("/src/click2.mp3");   
  soundclk.play();
  tampilkan.innerHTML += '<br>'
  huruf2 = tampilkan.innerHTML
})

btnDelete.addEventListener("click", function() {
  tampilkan.innerHTML = tampilkan.innerHTML.slice(0, -1);
  huruf2 = tampilkan.innerHTML
  var soundclk = new Audio("/src/click2.mp3");   
  soundclk.play();
})
