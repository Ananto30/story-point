<script>
  import { roomConfig } from './store.js'
  export let point
  export let timer

  let fibonacciPointing = [1, 2, 3, 5, 8, 13, 21]
  let tShirtPointing = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  let optionMapper = {
    'Fibonacci series': fibonacciPointing,
    'T-shirt sizing': tShirtPointing,
  }

  function onChange(event) {
    point = event.currentTarget.value
  }
</script>

<style>
  h5 {
    font-weight: 600;
  }
  #form-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  form {
    width: 100%;
  }
  form #form-title {
    margin-top: 0;
    font-weight: 400;
    text-align: center;
  }
  form #debt-amount-slider {
    display: flex;
    flex-direction: row;
    align-content: stretch;
    position: relative;
    width: 100%;
    height: 50px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  form #debt-amount-slider::before {
    content: ' ';
    position: absolute;
    height: 2px;
    width: 100%;
    width: calc(100% * (4 / 5));
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #000;
  }
  form #debt-amount-slider input,
  form #debt-amount-slider label {
    box-sizing: border-box;
    flex: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
  }
  form #debt-amount-slider label {
    display: inline-block;
    position: relative;
    width: 20%;
    height: 100%;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  form #debt-amount-slider label::before {
    content: attr(data-debt-amount);
    position: absolute;
    left: 50%;
    padding-top: 10px;
    transform: translate(-50%, 45px);
    font-size: 16px;
    letter-spacing: 0.4px;
    font-weight: 600;
    white-space: nowrap;
    /* opacity: 0.85; */
    transition: all 0.15s ease-in-out;
  }
  form #debt-amount-slider label::after {
    content: ' ';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    border: 2px solid #000;
    background: #fff;
    border-radius: 50%;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 1;
    cursor: pointer;
    transition: all 0.15s ease-in-out;
  }
  form #debt-amount-slider label:hover::after {
    transform: translate(-50%, -50%) scale(1.25);
  }
  form #debt-amount-slider input {
    display: none;
  }
  form #debt-amount-slider input:checked + label::before {
    font-weight: 800;
    opacity: 1;
  }
  form #debt-amount-slider input:checked + label::after {
    border-width: 20px;
    transform: translate(-50%, -50%) scale(0.4);
  }

  form:valid #debt-amount-slider input + label::before {
    transform: translate(-50%, 45px) scale(0.9);
    transition: all 0.15s linear;
  }
  form:valid #debt-amount-slider input:checked + label::before {
    transform: translate(-50%, 45px) scale(1.1);
    transition: all 0.15s linear;
  }
  @-webkit-keyframes spin {
    from {
      transform: rotate(0deg);
      width: 24px;
      opacity: 1;
      margin-right: 12px;
    }
    to {
      transform: rotate(360deg);
      width: 24px;
      opacity: 1;
      margin-right: 12px;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
      width: 24px;
      opacity: 1;
      margin-right: 12px;
    }
    to {
      transform: rotate(360deg);
      width: 24px;
      opacity: 1;
      margin-right: 12px;
    }
  }
</style>

<hr />
<div class="uk-margin-bottom">
  <h5 class="uk-text-center">
    Point the story in
    <span style="font-size: 2em; color: #ff4000cb;">{timer}</span>
    seconds 😰
  </h5>

  <form>
    <div id="form-wrapper">
      <form>
        <!-- <h1 id="form-title">Select Debt Amount</h1> -->
        <div id="debt-amount-slider">
          {#each optionMapper[$roomConfig.pointingSystem] as p, i}
            <input
              type="radio"
              name="debt-amount"
              id={i}
              value={p}
              required
              on:change={onChange} />
            <label for={i} data-debt-amount={p} />
          {/each}
        </div>
      </form>
    </div>
  </form>
</div>
