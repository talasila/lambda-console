import update from "immutability-helper";

export const lambdas = (state = null, action) => {
    switch(action.type) {
        case "LOAD_LAMBDAS":
            return actins.lambdas;

        default:
            return state;
    }
}

export const selectedLambda = (state = null, action) => {
    switch (action.type) {
        case "SET_SELECTED_LAMBDA":
            return action.lambda;
        
        default:
            return state;
    }
}

export const filter = (state = "", action) => {
    switch (action.type) {
        case "SET_FILTER":
            return action.filter;

        default:
            return state;
    }
}

export const logs = (state = null, action) => {
    switch (action.type) {
        case "LOAD_LAMBDA_LOGS":
            let logEvents = action.logs.reduce((out, inp, i)=> {
                out.push({time: new Date(inp.timestamp).toLocaleString(), message: inp.message});
                return out;
            }, []);

            if (state){
                return update(state, {[action.lambda]: {$set: logEvents}})
            } else {
                return {
                    [action.lambda]: logEvents
                }
            }
        default:
            return state;
    }
}

export const invocations = (state = null, action) => {
    switch (action.type) {
        case "LOAD_INVOCATION_RESULT":
            if (state) {
                return update(state, {[action.lambda]: {$set: action.result}});
            } else {
                return {
                    [action.lambda]: action.result
                }
            }
    
        default:
            return state;
    }
}

export const inputs = (state = null, action) => {
    switch (action.type) {
        case "LOAD_INVOCATION_RESULT":
            if (state) {
                return update(state, {[action.lambda]: {$set: action.input}});
            } else {
                return {
                    [action.lambda]: action.input
                }
            }

        default:
            return state;
    }
}