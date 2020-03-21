import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

class UtilsClass  {

    closeNavigationBar() {
        document.body.className='sidebar-icon-only'
    }

    openNavigationBar() {
        document.body.className=''

    }

    async callJenkins(jenkinsJob){
        return await axios.post(`/api/build`,jenkinsJob)
    }


    msConversion(millis) {
              let sec = Math.floor(millis / 1000);
              let hrs = Math.floor(sec / 3600);
              sec -= hrs * 3600;
              let min = Math.floor(sec / 60);
              sec -= min * 60;

              sec = '' + sec;
              sec = ('00' + sec).substring(sec.length);

              if (hrs > 0) {
                min = '' + min;
                min = ('00' + min).substring(min.length);
                return hrs + "h " + min + "mn " + sec +"s " ;
              }
              else {
                return min + "mn " + sec  + "s ";
              }
            }
}

let Utils = new UtilsClass()

export default Utils