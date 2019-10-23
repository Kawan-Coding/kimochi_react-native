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
  var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var tanggal = params.getDate();
  var xhari = params.getDay();
  var xbulan = params.getMonth();
  var xtahun = params.getYear();
  var hari = hari[xhari];
  var bulan = bulan[xbulan];
  var tahun = xtahun < 1000 ? xtahun + 1900 : xtahun;
  var jam = params.getHours();

  var menit = params.getMinutes();
  var detik = params.getSeconds();
  jam = addZero(jam);
  menit = addZero(menit);
  detik = addZero(detik);

  var date = {
    tanggal: tanggal,
    hari: hari,
    bulan: bulan,
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
