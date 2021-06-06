// export function weekWeather(rez) {
//     let four = rez.list.reduce((arr, el) => ((arr[el.dt_txt.split(' ')[0]] = arr[el.dt_txt.split(' ')[0]] || []).push(el), arr), {})
//     return four
// }

// export function milliToDate(milliseconds) {
//     let currentDate = new Date(milliseconds * 1000);
//     let options = {
//         weekday: {
//             weekday: 'long',
//         },
//         day: {
//             day: '2-digit',
//             month: 'long'
//         }
//     };
//     // let dateString = (new Intl.DateTimeFormat('En', options.day).format(currentDate));
//     // console.log(weekday)
//
//     return dateString
// }