import { firestore } from 'firebase';
import { call, put, takeEvery } from 'redux-saga/effects';
import { convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsFailure, fetchCollectionsSuccess } from './shop.actions';
import ShopActionTypes from './shop.types';

function* fetchCollectionsAsync() {
    yield console.log('i m fired')
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield console.log('i m fired 111')
        yield put({
            type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
            payload: collectionsMap
          });
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
    }

    // collectionRef
    //   .get()
    //   .then(snapshot => {
    //     const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //     dispatch(fetchCollectionsSuccess(collectionsMap));
    //   })
    //   .catch(error => dispatch(fetchCollectionsFailure(error.message)));
    
}
export function* fetchCollectionsStart() {
    yield takeEvery(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
}