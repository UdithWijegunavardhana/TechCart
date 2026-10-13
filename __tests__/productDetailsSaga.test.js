import {runSaga, stdChannel} from 'redux-saga';

import {productDetailsSaga} from '../app/features/productDetails/saga/productDetailsSaga';
import {productDetailsSagaActions} from '../app/features/productDetails/saga/productDetailsSagaActions';
import ProductDetailsService from '../app/features/productDetails/api/productDetails.service';

jest.mock('../app/features/productDetails/api/productDetails.service', () => ({
  getById: jest.fn(),
}));

const product = {id: 7, title: 'Mascara', price: 9.99, tags: ['beauty']};

const run = async action => {
  const dispatched = [];
  const channel = stdChannel();
  const task = runSaga(
    {channel, dispatch: a => dispatched.push(a)},
    productDetailsSaga,
  );
  channel.put(action);
  await new Promise(resolve => setImmediate(resolve));
  task.cancel();
  return dispatched.map(a => a.type);
};

describe('productDetailsSaga', () => {
  beforeEach(() => jest.clearAllMocks());

  it('fetches the product by id and stores it', async () => {
    ProductDetailsService.getById.mockResolvedValue(product);

    const types = await run(productDetailsSagaActions.fetchProduct(7));

    expect(ProductDetailsService.getById).toHaveBeenCalledWith(7);
    expect(types).toEqual([
      'productDetails/getProductRequest',
      'productDetails/getProductSuccess',
    ]);
  });

  it('stores the error message when the request fails', async () => {
    ProductDetailsService.getById.mockRejectedValue(new Error('Network Error'));

    const types = await run(productDetailsSagaActions.fetchProduct(7));

    expect(types).toEqual([
      'productDetails/getProductRequest',
      'productDetails/getProductFailure',
    ]);
  });
});
