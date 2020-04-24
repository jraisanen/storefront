import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ApiPath } from '../constants/api';
import { SfApiService } from '../services/api.service';
import { SfOrderStore } from '../stores/order.store';
import { Order } from '../types/order';

@Injectable({ providedIn: 'root' })
export class SfOrderAction {
  constructor(
    private readonly apiService: SfApiService,
    private readonly orderStore: SfOrderStore,
  ) {}

  fetchOrder(params: Params): Promise<Order> {
    const path = `${ApiPath.Orders}/${params.key}`;
    const request = this.apiService.getItem(path, this.apiService.authHeaders) as Promise<Order>;

    Promise.resolve(request)
      .then(order => this.orderStore.order = order)
      .catch(e => console.debug(e));

    return request;
  }

  fetchOrders(params: Params = {}, loadMore?: boolean): Promise<Order[]> {
    const request = this.apiService.getItems(ApiPath.Orders, params, this.apiService.authHeaders) as Promise<Order[]>;

    Promise.resolve(request)
      .then(orders => this.orderStore.orders = loadMore ? [...this.orderStore.orders, ...orders] : orders)
      .catch(e => console.debug(e));

    return request;
  }
}