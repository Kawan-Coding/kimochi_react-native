import React, {Component} from 'react';

export function IndonesiaDate(params) {
  var bulan = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];
  var bulanAngka = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var tanggal = params.getDate();
  var tanggalAngka = params.getDate();
  if (tanggalAngka < 10) {
    tanggalAngka = '0' + tanggalAngka;
  }
  var xhari = params.getDay();
  var xbulan = params.getMonth();
  var xtahun = params.getYear();
  var hari = hari[xhari];
  var bulan = bulan[xbulan];
  var bulanAngka = bulanAngka[xbulan];
  var tahun = xtahun < 1000 ? xtahun + 1900 : xtahun;
  var jam = params.getHours();

  var menit = params.getMinutes();
  var detik = params.getSeconds();
  jam = addZero(jam);
  menit = addZero(menit);
  detik = addZero(detik);

  var date = {
    tanggal: tanggal,
    tanggalAngka: tanggalAngka,
    hari: hari,
    bulan: bulan,
    bulanAngka: bulanAngka,
    tahun: tahun,
    jam: jam,
    menit: menit,
    detik: detik,
  };
  return date;
}
function addZero(params) {
  if (params < 10) {
    params = '0' + params;
  }
  return params;
}
