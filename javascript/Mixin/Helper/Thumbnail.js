export default function thumb(value) {
  return value.replace(/\.(jpg|jpeg|gif|png)$/i, '_tn.$1')
}
