export default function Search(array, item) {
  return array.filter(d => d.toLowerCase().indexOf(item.toLowerCase()) !== -1);
}
