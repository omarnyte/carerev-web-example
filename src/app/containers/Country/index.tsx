import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { PageWrapper } from 'app/components/PageWrapper';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { ErrorView } from './ErrorView';
import { actions } from './actions';
import { countryReducer, key } from './reducer';
import { saga } from './saga';
import { selectCountry, selectError, selectLoading } from './selectors';

interface Params {
  id: string;
}

export function Country() {
  useInjectReducer({ key: key, reducer: countryReducer });
  useInjectSaga({ key: key, saga });

  const country = useSelector(selectCountry);
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  const { id: countryId } = useParams<Params>();

  const dispatchFetchCountryAction = () =>
    dispatch(actions.fetchCountry(countryId));

  useEffect(() => {
    dispatchFetchCountryAction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageWrapper>
      {isLoading && <LoadingIndicator small />}
      {error && (
        <ErrorView error={error} onRetry={dispatchFetchCountryAction} />
      )}
      {country && (
        <>
          <h1>
            {country.name} ({country.code})
          </h1>
          <span>
            <strong>Currency Code:</strong> {country.currency_code}
          </span>
        </>
      )}
    </PageWrapper>
  );
}
