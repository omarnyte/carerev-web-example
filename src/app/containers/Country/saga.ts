import { call, put, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import { actions } from './actions';

export function* fetchCountry(action) {
  const { countryId } = action.payload;
  const requestURL = `https://api.carerev.com/api/v1/countries/${countryId}`;

  try {
    const country = yield call(request, requestURL);

    if (country) {
      yield put(actions.fetchCountrySuccess(country));
    } else {
      yield put(actions.fetchCountryError('No countries found.'));
    }
  } catch (err) {
    yield put(actions.fetchCountryError(err.toString()));
  }
}

export function* saga() {
  yield takeLatest(actions.fetchCountry.type, fetchCountry);
}
