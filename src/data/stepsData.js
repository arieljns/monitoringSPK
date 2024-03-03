import BasicTextFieldComponent from "../utils/BasicTextFieldComponent"
import TextFieldComponent from "../utils/TextFieldComponent"
import DatePickerComponent from "../utils/DatePickerComponent"
import TimePickerComponent from "../utils/TimePickerComponent"
import CheckBoxComponent from "../utils/CheckBoxComponent"

const steps = [
    {
        label: 'Nama Karyawan:',
        description: <TextFieldComponent props="karyawan" />,
    },
    {
        label: 'Pilih Tanggal',
        description:
            <DatePickerComponent />,
    },
    {
        label: 'Kehadiran',
        description:
            <CheckBoxComponent props="kehadiran" />,
    },
    {
        label: 'Jam Mulai',
        description: <TimePickerComponent />,
    },
    {
        label: 'Jam Selesai',
        description: <TimePickerComponent />,
    },
    {
        label: 'Nama PJK',
        description: <TextFieldComponent />,
    },
    {
        label: 'Target',
        description: <BasicTextFieldComponent />,
    },
    {
        label: 'Satuan Target',
        description: <CheckBoxComponent props="satuanTarget" />,
    },
    {
        label: 'Capaian Target',
        description: <BasicTextFieldComponent />,
    },
    {
        label: 'Satuan Capaian',
        description: <CheckBoxComponent props="satuanTarget" />,
    },
    {
        label: 'Deskripsi Kegiatan',
        description: <BasicTextFieldComponent props="text" />,
    },
    {
        label: 'Jenis Kegiatan',
        description: <CheckBoxComponent props="jenisKegiatan" />,
    },
    {
        label:"Upload Bukti Kegiatan:",
        description:<BasicTextFieldComponent props="text"/>
    },
    {
        label: 'Apakah Ada Kegiatan Lain?',
        description: <CheckBoxComponent />,
    },
];


export default steps