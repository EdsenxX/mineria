// Dependencies
import Head from "next/head";
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react'
// Services
import { removeRegisters } from "@services/registers";
// Components
import { Button } from "@nextui-org/react";

export default function Main() {

    const [loading, setLoading] = useState(false);

    const cleanDataBase = async () => {
        if(loading) return;
        setLoading(true);
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esta accion. Perderas todos los registros de la base de datos.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, borrar!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await removeRegisters();
                Swal.fire(
                    'Borrado!',
                    'La base de datos ha sido borrada.',
                    'success'
                )
                setLoading(false);
            }
        })
    }

    return (
        <div>
            <h1 className="text-2xl text-center mt-5">Dataset</h1>
            <Button onClick={cleanDataBase} >Limpiar base de datos</Button>
        </div>
    )
}