import moment from 'moment';
const isEmpty = (value) => {
  if (typeof value === "number") return false;
  else if (typeof value === "string") return value.trim().length === 0;
  else if (Array.isArray(value)) return value.length === 0;
  else if (typeof value === "object")
    return value == null || Object.keys(value).length === 0;
  else if (typeof value === "boolean") return false;
  else return !value;
};
export default isEmpty;

export const getBackgroundColorBySeverity = (severity) => {
  return severity.toLowerCase() === "critical" ? "#b90000" : severity.toLowerCase() === "high" ? "red" : severity.toLowerCase() === "medium" ? "#ef9424" : "green";
};

export const getFontColorBySeverity = (severity) => {
  return 'white';
};

export const setDateFormat = (date) => {	
  let mdate = date.replace("_"," ");
  var d1=mdate.split(" ");
  var date=d1[0].split("-");  
  /*let dateParts = mdate.split("-");*/
  /*let timeParts = dateParts[2].split(" ")[1].split(":");
  dateParts[2] = dateParts[2].split(" ")[0];
  console.log(date[2]+':'+date[1]+':'+date[0]+' '+time[0]+':'+time[1]+':'+time[2]);*/
  if(d1[1]){
  	var time=d1[1].split(":");
  	return date[1]+'-'+date[0]+'-'+date[2]+' '+time[0]+':'+time[1]+':'+time[2];
  } else {
  	return date[1]+'-'+date[0]+'-'+date[2];
  }
  
};
