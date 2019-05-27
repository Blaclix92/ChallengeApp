import { Flight } from 'src/app/model/flight';

export class Utils {
    /**
 * @description Format date by month, day and year
 * @param {string} date
 * @returns {string} formattedDate
 */
  formatDate(date: string): string{
    const splitted: string[] = date.split("/", 3);
    const day: string = splitted[0];
    const month:string = splitted[1];
    const year:string = splitted[2];
    const formattedDate = month + "/" + day + "/" + year;
    return formattedDate;
  }

 /**
   * @description Removes all " " and "_" in json events
   * @param {any} data 
   */
  formatDataAttributes(data: any): string {
    const regex: RegExp = /[._ ]+/g;
    const formattedData:string = JSON.stringify(JSON.parse(data.data)).replace(regex, "");
    return formattedData;
  }

    /**
   * @description Format time by hours and minutes
   * @param {string} time
   */
  formatTime(time: string): string {
    const splitted: string[] = time.split(":", 3);
    const hh:string = splitted[0];
    const mm:string = splitted[1];
    const formattedTime:string = hh + ":" + mm;
    return formattedTime;
  }

    /**
   * @description Create an array of unique dates
   * @param {Flight[]} flights 
   */
  sortDates(flights: Flight[]): void {
    let data: any = [];
    for (let item of flights) {
      if (!data.includes(item.Date)) { data.push(item.Date) };
    }
    return data;
  }

  /**
 * @description Takes a string name value to set white space between first name and last name
 * @param {string} name
 * @returns {string} formatted crew name
 */
formatCrewName(name: string): string { 
    const regex: RegExp = /([a-z])([A-Z])/g;
     return name.replace(regex, '$1 $2');
    }


}