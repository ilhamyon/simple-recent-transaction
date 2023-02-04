import {TextStyle} from 'react-native';

export function getStyleBankName(name: string): TextStyle {
  return {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'black',
    textTransform: name.length > 4 ? 'capitalize' : 'uppercase',
  };
}

export function formatRupiah(value: number): string {
  return `Rp${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
}

export function formatIndonesianDate(dateInString: string): string {
  const month = [
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

  const date: Date = new Date(dateInString.replace(' ', 'T'));
  return `${date.getDate()} ${month[date.getMonth()]} ${date.getFullYear()}`;
}
