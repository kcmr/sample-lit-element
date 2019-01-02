import { LitElement, html } from '@polymer/lit-element';

export class SampleLitElement extends LitElement {
  static get properties() {
    return {
      avatar: {
        type: String
      },
      name: {
        type: String
      },
      email: {
        type: String
      },
      phone: {
        type: String
      },
      vip: {
        type: Boolean,
      },
      cats: {
        type: Array
      },
      phoneVisibilityDuration: {
        type: Number,
        attribute: 'phone-visibility-duration'
      },
      _btnPhoneClicked: {
        type: Boolean
      }
    };
  }

  constructor() {
    super();

    this.vip = false;
    this.cats = [];
    this.phoneVisibilityDuration = 5000;
    this._btnPhoneClicked = false;
  }

  firstUpdated() {
    this.addEventListener('custom', this._onCustomEvent);
  }

  _onCustomEvent(event) {
    console.log('custom event fired from Light DOM', event);
  }

  render() {
    return html`
      <style>
        :host {
          display: block;
          position: relative;
          box-sizing: border-box;
          background-color: #fff;
          border-radius: 4px;
          padding: 32px 16px;
          box-shadow: 0 5px 13px -7px rgba(0, 0, 0, 0.2);
          color: #121212;
          @apply --contact-card;
        }

        :host([hidden]), [hidden] {
          display: none !important;
        }

        *, *:before, *:after {
          box-sizing: inherit;
        }

        .main-heading {
          font-size: 24px;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .secondary-heading {
          font-size: 18px;
          margin-top: 0;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .avatar {
          flex: none;
          border-radius: 50%;
        }

        .cats {
          width: 100%;
          margin-top: 24px;
        }

        .cats .secondary-heading {
          text-align: center;
        }

        .cat-list {
          text-align: center;
          list-style: none;
          margin-top: 0;
          padding: 0;
        }

        .cat-list li {
          line-height: 1.5;
        }

        button {
          font: inherit;
          border-radius: 4px;
          border: 0;
          font-weight: 500;
          padding: 0 20px;
          height: 44px;
        }

        button:disabled {
          opacity: 0.5;
        }

        .phone {
          margin-top: 20px;
          font-weight: 500;
        }

        .badge {
          position: absolute;
          top: 8px;
          right: 8px;
          font-size: 12px;
          font-weight: 500;
          background-color: #FFC107;
          padding: 4px 6px 3px;
          line-height: 1;
          border-radius: 3px;
        }

        .link {
          color: #E91E63;
        }

        .btn {
          color: #fff;
          background-color: #E91E63;
        }
      </style>

      <div class="wrapper">
        <div class="badge" ?hidden="${!this.vip}">VIP</div>
        <img class="avatar" src="${this.avatar}" alt="">
        <h2 class="user-name main-heading">${this.name}</h2>
        <div><a class="email link" href="mailto:${this.email}">${this.email}</a></div>

        <div class="cats">
          <h3 class="secondary-heading">My cats</h3>
          <ul class="cat-list">
            ${this.cats.map(item => html`<li>${item}</li>`)}
          </ul>
        </div>

        <slot>
          your content here...
        </slot>

        <button class="btn" @click="${this._showPhone}" ?disabled="${this._btnPhoneClicked}">Show phone</button>

        ${this._btnPhoneClicked ? html`
          <div class="phone">${this.phone}</div>`
        : html``}
      </div>
    `;
  }

  _showPhone() {
    this._btnPhoneClicked = true;

    // sample event without dash
    this.dispatchEvent(new CustomEvent('myevent', {
      bubbles: true,
      composed: true,
      detail: 'sample'
    }));

    this.dispatchEvent(new CustomEvent('phone-shown', {
      detail: this.phone,
      bubbles: true,
      composed: true
    }));

    setTimeout(() => {
      this._btnPhoneClicked = false;
    }, this.phoneVisibilityDuration);
  }
}

window.customElements.define('sample-lit-element', SampleLitElement);
