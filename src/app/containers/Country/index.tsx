import { LoadingIndicator } from 'app/components/LoadingIndicator';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { actions } from './actions';
import { countryReducer, key } from './reducer';
import { saga } from './saga';
import { selectCountry, selectError, selectLoading } from './selectors';

interface TParams {
  id: string;
}

export function Country({ match }: RouteComponentProps<TParams>) {
  useInjectReducer({ key: key, reducer: countryReducer });
  useInjectSaga({ key: key, saga });

  const country = useSelector(selectCountry);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    const countryId = match.params.id;
    dispatch(actions.fetchCountry(countryId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {isLoading && <LoadingIndicator small />}
      {country ? (
        <div>
          <h1>
            {country.name} ({country.code})
          </h1>
          <span>{country.currency_code}</span>
        </div>
      ) : error ? (
        <span>{error}</span>
      ) : null}
    </div>
  );
}
