import React, { Component } from 'react'

export default class TakingOrder extends Component {
    constructor(props){
        super(props);
        this.state={
            data_customer:{
                nama_lengkap='Kawan Koding',
                //sak teruse
            },
            // data:[
            //     data dari API
            // ],
            pilihan_barang:{
                [barang_id]:{
                    barang_id='',
                    qty=2,
                    nama_barang:'',
                    deskripsi_barang:'',
                    foto_barang:'',
                    harga=15000,
                    jenis_transaksi='cuci_helm',
                    jenis_helm='',
                    merk_helm='',
                    lama_pemakaian='',
                    kondisi:{
                        tempurung_luar='mulus',
                        kaca='visor',
                        baut_kiri='bagus',
                        baut_kanan='bagus',
                        busa='bagus',
                        kondisi_busa='kempes - keder => ~',
                    },
                    foto_helm:''
                }
                
            }
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
