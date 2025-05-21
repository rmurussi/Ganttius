const url_base = "https://squid-app-33v59.ondigitalocean.app";
const gstatus = [
 "close",
 "newTask",
 "notStarted",
 "inProgress",
 "completed",
 "inPlanning",
 "inTesting",
 "delayed",
 "onHold",
 "closed",
 "budgeting",
 "inReview",
 "canceled",
 "postponed",
 "w8",
];

const status_colors = {
 "notStarted": "bg-gray-300",
 "inProgress": "bg-teal-300",
 "completed": "bg-blue-400",
 "inPlanning": "bg-gray-300",
 "inTesting": "bg-blue-200",
 "delayed": "bg-purple-400",
 "onHold": "bg-yellow-200",
 "closed": "bg-green-400",
 "budgeting": "bg-green-200",
 "inReview": "bg-blue-200",
 "canceled": "bg-red-300",
 "postponed": "bg-purple-200",
 "w8": "bg-purple-300"
};