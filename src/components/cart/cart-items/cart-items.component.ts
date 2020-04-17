import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { SfCartService } from '../../../services/cart.service';
import { Direction } from '../../../constants/cart';
import { SfConfigStore } from '../../../stores/config.store';
import { Cart } from '../../../types/cart';

const LABELS = ['', 'Name', 'Price', 'Quantity', 'Total Price', ''];

@Component({
  selector: 'sf-cart-items',
  styleUrls: ['./cart-items.component.scss'],
  templateUrl: './cart-items.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SfCartItemsComponent {
  @Input() readonly cart = {} as Cart;

  readonly Direction = Direction;
  readonly labels = LABELS;

  constructor(
    readonly cartService: SfCartService,
    readonly configStore: SfConfigStore,
  ) {}
}
