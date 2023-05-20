export function* watchClickSaga() {
    yield console.log('hello sagas');
}

export default function* rootSaga() {
    yield watchClickSaga();
}
