const btnConfirm = document.querySelector('.confirm-button');

btnConfirm.addEventListener('click', function() {
  let inputData = document.querySelector(".input-form").value;
  let NAMA = document.querySelector('.name').value;
  let NIM = document.querySelector('.nomor-induk').value;
  let MATKUL = document.querySelector('.mata-kuliah').value;
  let emailDosen = document.querySelector('.email-dosen').value;

  var soundclk = new Audio("/src/click2.mp3");  
  soundclk.play()
  
  if (inputData === "") {
    alert("Masukkan data terlebih dahulu!!");
  } else {
    let obj = {
      nama: NAMA,
      nim: NIM,
      matkul: MATKUL,
      userEmail: emailDosen,
    };

    fetch("/data", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    window.location = "/braille";
  }

})

