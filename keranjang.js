let listProduk = [
   { name: 'Brokoli', tag: 'sayur1', price: 15000, amount: 0 },
   { name: 'Wortel', tag: 'sayur2', price: 12000, amount: 0 },
   { name: 'Lobak Putih', tag: 'sayur3', price: 15000, amount: 0 },
   { name: 'Buncis', tag: 'sayur4', price: 20000, amount: 0 },
   { name: 'Kentang', tag: 'sayur5', price: 12000, amount: 0 },
   { name: 'Tomat', tag: 'sayur6', price: 15000, amount: 0 },
   { name: 'Kecipir', tag: 'sayur7', price: 15000, amount: 0 },
   { name: 'Cabe Rawit', tag: 'sayur8', price: 12000, amount: 0 },
   { name: 'Terong Ungu', tag: 'sayur9', price: 14000, amount: 0 },
   { name: 'Timun', tag: 'sayur10', price: 15000, amount: 0 },
   { name: 'Bawang Bombai', tag: 'sayur11', price: 20000, amount: 0 },
   { name: 'Bawang Merah', tag: 'sayur12', price: 25000, amount: 0 },
   { name: 'Bawang Putih', tag: 'sayur13', price: 20000, amount: 0 },
   { name: 'Labu', tag: 'sayur14', price: 25000, amount: 0 },
   { name: 'Pisang', tag: 'buah1', price: 15000, amount: 0 },
   { name: 'Lemon', tag: 'buah2', price: 18000, amount: 0 },
   { name: 'Buah Bit', tag: 'buah3', price: 15000, amount: 0 },
   { name: 'Belimbing', tag: 'buah4', price: 20000, amount: 0 },
   { name: 'Alpukat', tag: 'buah5', price: 15000, amount: 0 },
   { name: 'Pir', tag: 'buah6', price: 18000, amount: 0 },
   { name: 'Apel', tag: 'buah7', price: 25000, amount: 0 },
   { name: 'Stroberi', tag: 'buah8', price: 15000, amount: 0 },
   { name: 'Jeruk', tag: 'buah9', price: 20000, amount: 0 },
   { name: 'Bakso Sapi', tag: 'frozen1', price: 40000, amount: 0 },
   { name: 'Sosis Ayam', tag: 'frozen2', price: 30000, amount: 0 },
   { name: 'Test No 1', tag: 'test1', price: 100000, amount: 0 },
   { name: 'Test No 2', tag: 'test2', price: 99000, amount: 0 },
];

function tambahProduk(nomor){
   //console.log("Produk ditambahkan: ", listProduk[nomor-1]);
   window.alert("Produk "+ listProduk[nomor-1].name +" Berhasil Ditambahkan");

   countProduk();
   setItems(listProduk[nomor-1], nomor);
   countSubtotal(nomor);
}

function ubahKuantitas(nomor){
   let tabelProduk = JSON.parse(localStorage.getItem("produkKeranjang"));
   let selectedRow = document.getElementById("produk-"+nomor);
   let selectedInput = selectedRow.getElementsByTagName("input");

   let jumlahProduk = parseInt(localStorage.getItem("jumlahItemKeranjang"));
   let kuantitasProdukAwal = tabelProduk[nomor].amount;
   let kuantitasProdukBaru = selectedInput[0].value;

   console.log("Kuantitas Awal:", kuantitasProdukAwal);
   console.log("Kuantitas Baru:", kuantitasProdukBaru);

   if(kuantitasProdukBaru == 0){ //produk hapus otomatis
      //kuantitas capai nol
      deleteProduk(nomor);
      return;
   }else if(kuantitasProdukAwal > kuantitasProdukBaru){ //produk dikurangi
      console.log("Item Berkurang");
      jumlahProduk -= 1; 

   }else{ //produk ditambah
      console.log("Item Bertambah");
      jumlahProduk += 1;
   }

   tabelProduk[nomor].amount = kuantitasProdukBaru;
   console.log("Kuantitas Sekarang:", tabelProduk[nomor].amount);
   localStorage.setItem("jumlahItemKeranjang", jumlahProduk);
   localStorage.setItem("produkKeranjang", JSON.stringify(tabelProduk));

   countSubtotal(nomor);

   let selectedSubtotal = selectedRow.getElementsByTagName("td")[2];
   let tabelSubtotal = JSON.parse(localStorage.getItem("subtotalKeranjang"));

   selectedSubtotal.innerText = "Rp. " + tabelSubtotal[nomor].sub;

   countPembayaran();
}

function setItems(produk, nomor){
   console.log("Produk masuk setItems = ", produk);

   let isiKeranjang = localStorage.getItem("produkKeranjang");
   isiKeranjang = JSON.parse(isiKeranjang);

   if(isiKeranjang != null){ //Keranjang tidak kosong
      if(isiKeranjang[nomor] == undefined){ //Produk baru masuk
         isiKeranjang = {
            ...isiKeranjang,
            [nomor]: produk
         }
      }
      isiKeranjang[nomor].amount += 1; //Tambah jumlah produk
   }else{
      produk.amount = 1;   //Keranjang kosong
      isiKeranjang = {
         [nomor]: produk
      }
   }
   localStorage.setItem("produkKeranjang", JSON.stringify(isiKeranjang));
}

function countProduk(){
   let jumlahProduk = localStorage.getItem("jumlahItemKeranjang");
   jumlahProduk = parseInt(jumlahProduk);

   if(jumlahProduk){
      localStorage.setItem("jumlahItemKeranjang", jumlahProduk+1)
   }else{
      localStorage.setItem("jumlahItemKeranjang", 1)
   }
}

function countSubtotal(nomor){
   let keranjang = JSON.parse(localStorage.getItem("produkKeranjang"));
   let subtotal = keranjang[nomor].amount * keranjang[nomor].price;
   let kodeProduk = "produk-" + nomor

   let sub = { count: keranjang[nomor].amount, sub: subtotal };
   let tabelSubtotal = localStorage.getItem("subtotalKeranjang");
   tabelSubtotal = JSON.parse(tabelSubtotal);

   //Set Tabel
   if(tabelSubtotal != null){ //Subtotal tidak kosong
      if(tabelSubtotal[nomor] == undefined){ //Produk baru masuk
         tabelSubtotal = {
            ...tabelSubtotal,
            [nomor]: sub
         }
      }
      tabelSubtotal[nomor] = sub; //Update subtotal produk

   }else{ //Subtotal kosong
      tabelSubtotal = {
         [nomor]: sub
      }
   }
   localStorage.setItem("subtotalKeranjang", JSON.stringify(tabelSubtotal));

   //Display
   console.log("Nama Produk: ", listProduk[nomor-1].name);
   console.log("Kode Produk: ", kodeProduk);
   console.log("Subtotal   : ", subtotal);


}

function refreshKeranjang(){
   let tabel = document.getElementById("tabel-keranjang");
   let menuBayar = document.getElementById("menu-bayar");
   let tabelProduk = JSON.parse(localStorage.getItem("produkKeranjang"));
   let tabelSubtotal = JSON.parse(localStorage.getItem("subtotalKeranjang"));

   let totalSubtotal = 0;
   let totalOngkir = 0;
   let totalAkhir = 0;

   for(var i = 1, row; row = tabel.rows[i]; i++){
      //iterasi tiap row produk
      console.log("Row Saat Ini = ", row.id);
      let displayAmount = row.cells[1].getElementsByTagName('input')[0];
      let displaySub = row.cells[2];

      if(tabelProduk == null || localStorage.getItem("jumlahItemKeranjang") == 0){ //keranjang kosong
         tabel.style.display = "none";
         menuBayar.style.display = "none";
         document.getElementById("notif-kosong").style.display = "block";
         console.log("Keranjang Kosong")
      }else{
         document.getElementById("notif-kosong").style.display = "none";
         if(tabelProduk[i] == undefined || tabelSubtotal[i].count == 0){ //Produk tidak ada di keranjang
            row.style.display = "none";
            console.log("Row Nomor", i, "Kosong");
         }else{
            displayAmount.value = tabelSubtotal[i].count;
            displaySub.innerText = "Rp. " + tabelSubtotal[i].sub;
         }
      }
   }

   countPembayaran();
}

function countPembayaran(){
   let tabelSubtotal = JSON.parse(localStorage.getItem("subtotalKeranjang"));
   let jumlahProduk = localStorage.getItem("jumlahItemKeranjang");

   let totalSubtotal = 0;
   let totalOngkir = 0;
   let totalAkhir = 0;

   for(i = 1; i <= 27; i++){
      if(tabelSubtotal[i] != undefined){
         totalSubtotal += tabelSubtotal[i].sub;
      }
   }

   totalOngkir = jumlahProduk * 500 + 5000;
   totalAkhir = totalSubtotal + totalOngkir;

   document.getElementById("totalSubtotal").innerText = "Rp. " + totalSubtotal;
   document.getElementById("totalOngkir").innerText = "Rp. " + totalOngkir;
   document.getElementById("totalBayar").innerText = "Rp. " + totalAkhir;
}

function deleteProduk(nomor){
   let tabelProduk = JSON.parse(localStorage.getItem("produkKeranjang"));
   let tabelSubtotal = JSON.parse(localStorage.getItem("subtotalKeranjang"));

   window.alert("Produk " + tabelProduk[nomor].name + " Telah Dihapus")

   let counter = tabelSubtotal[nomor].count;
   let temp1 = { name: '', tag: '', price: 0, amount: 0 };
   let temp2 = { count: 0, sub: 0 };


   localStorage.setItem("jumlahItemKeranjang", parseInt(localStorage.getItem("jumlahItemKeranjang")) - counter);

   tabelProduk[nomor] = null;
   tabelSubtotal[nomor] = temp2;

   localStorage.setItem("produkKeranjang", JSON.stringify(tabelProduk));
   localStorage.setItem("subtotalKeranjang", JSON.stringify(tabelSubtotal));

   refreshKeranjang();
}

function deleteProdukSpecial(nomor){
   let tabelProduk = JSON.parse(localStorage.getItem("produkKeranjang"));
   let tabelSubtotal = JSON.parse(localStorage.getItem("subtotalKeranjang"));

   let counter = tabelSubtotal[nomor].count;
   let temp1 = { name: '', tag: '', price: 0, amount: 0 };
   let temp2 = { count: 0, sub: 0 };

   localStorage.setItem("jumlahItemKeranjang", parseInt(localStorage.getItem("jumlahItemKeranjang")) - counter);

   tabelProduk[nomor] = null;
   tabelSubtotal[nomor] = temp2;

   localStorage.setItem("produkKeranjang", JSON.stringify(tabelProduk));
   localStorage.setItem("subtotalKeranjang", JSON.stringify(tabelSubtotal));

   refreshKeranjang();
}

function deleteAllProduk(){
   let tabel = document.getElementById("tabel-keranjang");

   for(var i = 1, row; row = tabel.rows[i]; i++){
      if(row.style.display != "none"){
         //tabel ditampilkan
         deleteProdukSpecial(i);
      }
   }
}

function loadKeranjang() {
   console.log("Load Keranjang");
   refreshKeranjang();
}   
