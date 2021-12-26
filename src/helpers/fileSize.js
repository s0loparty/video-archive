export default function(size) {
	if (size < 1024) return size + ' Б'
	let i = Math.floor(Math.log(size) / Math.log(1024))
	let num = (size / Math.pow(1024, i))
	let round = Math.round(num)
	num = round < 10 ? num.toFixed(2) : round < 100 ? num.toFixed(1) : round
	return `${num} ${'КМГТПУЗУ'[i-1]}Б`
}
