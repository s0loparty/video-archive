<template>
	<div class="switch-container">
		<label class="switch switch-autoplay">
			<input type="checkbox">
			<span class="slider"></span>
		</label>
		<label class="switch switch-next">
			<input type="checkbox">
			<span class="slider"></span>
		</label>
		<label class="switch switch-theme">
			<input type="checkbox">
			<span class="slider"></span>
		</label>
	</div>

	<!-- <div class="switch">
		<div class="switch__container">
			<label class="switch__item">
				<input type="checkbox" checked>
				<span></span>
			</label>
			<label class="switch__item">
				<input type="checkbox">
				<span></span>
			</label>
			<label class="switch__item">
				<input type="checkbox">
				<span></span>
			</label>
		</div>
	</div> -->
</template>

<style scpoed>
.switch-container {
	position: fixed;
	bottom: 20px;
	left: 20px;
	background-color: var(--color-secondary);
	padding: 10px;
	border-radius: var(--rounded);
	z-index: var(--z-sticky);
	display: flex;
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-right: 10px;
}
.switch:last-child {margin-right: 0;}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: var(--rounded);
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: var(--rounded);
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}
</style>
