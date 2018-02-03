import AWS from "aws-sdk";
import Promise from "bluebird";
import _ from "lodash";

export const loadLambda = () => {
    return async (dispatch, getState) => {
        let { login } = getState();

        AWS.config.update({
            region: "us-east-1",
            credentials: new AWS.Credentials(
                login.awsAccessKeyId,
                login.awsSecretKey,
                login.awsSessionToken
            )
        });

        let lambda = new AWS.Lambda();
        let listFunctions = Promise.promisify(lambda.listFunctions.bind(lambda));
        let lambdas = [], nextMarker = null, data = null;

        try {
            do {
                data = await listFunctions({FunctionVersion: "ALL", Marker: nextMarker});
                lambdas = _.concat(lambdas, data.Functions)
                nextMarker = data.NextMarker
            } while (data && nextMarker)
        } catch (e) {
            console.log(e);
        }

        dispatch({
            type: "LOAD_LAMBDAS",
            lambdas: _.keyBy(lambdas, "FunctionName")
        });
    }
}

export const setSelectedLambda = (lambda) => {
    return (dispatch, getState) => {
        dispatch({
            type: "SET_SELECTED_LAMBDA",
            lambda
        });

        let { login } = getState();
        getLogs(login, lambda, dispatch);
    }
}

export const loadLogs = (lambda) => {
    return (dispatch, getState) => {
        dispatch({
            type: "SET_SELECTED_LAMBDA",
            lambda
        });

        let { login } = getState();
        getLogs(login, lambda, dispatch);
    }
}

const getLogs = (login, lambda, dispatch) => {
    AWS.config.update({
        region: "us-east-1",
        credentials: new AWS.Credentials(
            login.awsAccessKeyId,
            login.awsSecretKey,
            login.awsSessionToken
        )
    });

    let logs = new AWS.CloudWatchLogs();
    let logGroupName = "/aws/lambda/" + lambda;

    logs.describeLogStreams({logGroupName: logGroupName, limit: 1, orderBy: "lastEventTime", descending: true}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            logs.getLogEvents({logGroupName: logGroupName, logStreamName: data.logStreams[0].logStreamName}, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    dispatch({
                        type: "LOAD_LAMBDA_LOGS",
                        lambda,
                        logs: data.events
                    });
                }
            });
        }
    });
}

export const setFilter = (filter) => {
    return {
        type: "SET_FILTER",
        filter
    }
}

export const invokeLambda = (lambdaToInvoke, payload, clientContext) => {
    return (dispatch, getState) => {
        let { login } = getState();

        AWS.config.update({
            region: "us-east-1",
            credentials: new AWS.Credentials(
                login.awsAccessKeyId,
                login.awsSecretKey,
                login.awsSessionToken
            )
        });

        let lambda = new AWS.Lambda();
        let params = {
            FunctionName: lambdaToInvoke,
            InvocationType: "RequestResponse",
            LogType: "Tail",
            Payload: payload
        }

        lambda.invoke(params, (err, data) => {
            if (data) {
                dispatch({
                    type: "LOAD_INVOCATION_RESULT",
                    lambda: lambdaToInvoke,
                    result: data,
                    input: payload
                });
            }
        });
    }
}