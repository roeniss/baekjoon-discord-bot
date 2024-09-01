export class TimeUtil {
    static formatDailyTime(dailyTime: string): string {
        let [hh, mm] = dailyTime.split(' ')
        if (hh.length === 1) {
            hh = `0${hh}`
        }
        if (mm.length === 1) {
            mm = `0${mm}`
        }
        return `${hh}:${mm}`
    }
}