import * as moment from 'moment';


export class Doc {
    public _id?:string;
    public _rev?:string;
    public _deleted?:boolean;
    public type?:string; //this is to distinguish different doc types

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}



export class Meeting extends Doc { 
    //_id will be date
    public talks?:Talk[];

    getDate():string{
        if(!this._id) return '';
        return this._id.split('/')[1];
    }
    getPrintDate(){
        if(!this._id) return '';
        return moment(this._id.split('/')[1],'YYYYMMDD').format('dddd, MMM Do YYYY');
    }

}



export class Talk {
    id?: number;
    student?:string;
    lesson?:number;
    time?: number;
    note?: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

}


export class Student extends Doc {
    public name?: string;
    public sex?: boolean; //true:false, false:female, just to make it more simpler when assigning talks that require brothers
    public talks?: Talk[];

    getShortName():string{
        if(!this._id) return '';
        return this._id.split('/')[1];
    }

    printFullName():string{
        if(!this._id) return '';
        if(!this.name) this.name="";
        return this.name+" ("+this.getShortName()+")";
    }
}



export const StudentTalks = [
    {id:0, name: "Bible Reading", length: 4, student: true},
    {id:1, name: 'Initial Call', length: 2, student: true},
    {id:2, name: 'Return Visit', length: 4, student: true},
    {id:3, name: 'Bible Study', length: 6, student: true},
];

export const StudentLessons = [
    {id:1, name: ""},
    {id:2, name: ""},
    {id:3, name: ""},
    {id:4, name: ""},
    {id:5, name: ""},
    {id:6, name: ""},
    {id:7, name: ""},
    {id:8, name: ""},
    {id:9, name: ""},
    {id:10, name: ""},
    {id:11, name: ""},
    {id:12, name: ""},
    {id:13, name: ""},
    {id:14, name: ""},
    {id:15, name: ""},
    {id:16, name: ""},
    {id:17, name: ""},
    {id:18, name: ""},
    {id:19, name: ""},
    {id:20, name: ""},
    {id:21, name: ""},
    {id:22, name: ""},
    {id:23, name: ""},
    {id:24, name: ""},
    {id:25, name: ""},
    {id:26, name: ""},
    {id:27, name: ""},
    {id:28, name: ""},
    {id:29, name: ""},
    {id:30, name: ""},
    {id:31, name: ""},
    {id:32, name: ""},
    {id:33, name: ""},
    {id:34, name: ""},
    {id:35, name: ""},
    {id:36, name: ""},
    {id:37, name: ""},
    {id:38, name: ""},
    {id:39, name: ""},
    {id:40, name: ""},
    {id:41, name: ""},
    {id:42, name: ""},
    {id:43, name: ""},
    {id:44, name: ""},
    {id:45, name: ""},
    {id:46, name: ""},
    {id:47, name: ""},
    {id:48, name: ""},
    {id:49, name: ""},
    {id:50, name: ""},
    {id:51, name: ""},
    {id:52, name: ""},
    {id:53, name: ""},
];
 

/*
export const TalkTypes = [
    {name: 'Opening Comments', length: 3},
    {name: "Treasures From God’s Word: Talk", length: 3},
    {name: "Treasures From God’s Word: Spiritual Gems", length: 3},
    {name: "Treasures From God’s Word: Reading", length: 3, student: true},
    {name: 'Apply Yourself to the Field Ministry: Initial Call', length: 3, student: true},
    {name: 'Apply Yourself to the Field Ministry: Return Visit', length: 3, student: true},
    {name: 'Apply Yourself to the Field Ministry: Bible Study', length: 3, student: true},
    {name: 'Living as Christians: Talk 1', length: 10},
    {name: 'Living as Christians: Talk 2', length: 10},
    {name: 'Living as Christians: Bible Study', length: 3},
];
*/
