const initState = {
    currentLocation: "",
    minSalary: "",
    jobType: "",
    jobs: [],
    locationError: null
}

const jobReducer = (state = initState, action) => {
    switch (action.type) {
      case 'CREATE_JOB_SUCCESS':
        console.log('create job success');
        return state;
      case 'NOTIFICATION_SUCCESS':
        console.log('notification success');
        return state;
      case 'NOTIFICATION_ERROR':
        console.log('new notification error');
        return state;
      case 'CREATE_JOB_ERROR':
        console.log('create job error');
        return state;
      case 'LOCATION_SUCCESS':
   //     console.log('LOCATION SUCCESSFULLY FETCHED');
        return state;
      case 'LOCATION_ERROR':
    //  console.log('unable to fetch location');
        return state;
      case 'MIN_SALARY_UPDATED':
        return state;
      case 'JOBTYPE_UPDATED':
        return state;
      case 'DETAILS_UPDATED':
        return state;
      case 'DETAILS_ERROR':
        return state;
      default:
        return state;
    }
  };
  

export default jobReducer