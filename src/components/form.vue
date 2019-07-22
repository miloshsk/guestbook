<template>
		<form
				@submit.prevent="isFormValid"
				class="message-form">
			<transition name="fade">
				<p class="message-form__success" v-if="showMessage">Сообщение отправленно</p>
			</transition>
			<div class="container">
				<div class="message-form__content">
					<div class="message-form__group">
							<input
									:class="[{'message-form__field--error': errors.guestName.show}, 'message-form__field']"
									v-model="guest.guestName"
									type="text"
									id="guest-name">
							<label
									class="message-form__label"
									for="guest-name">Имя</label>
					</div>
					<div class="message-form__group">
						<textarea-autosize
								:class="[{'message-form__field--error': errors.guestText.show}, 'message-form__field']"
								v-model="guest.guestText"
								:min-height="50"
								:max-height="350"
								id="guest-text">
						</textarea-autosize>
						<label
								class="message-form__label"
								for="guest-text">Сообщение</label>
					</div>
					<button
						class="btn message-form__btn"
						type="submit">Отправить</button>
				</div>
			</div>
		</form>
</template>

<script>
	export default {
		name: "app-form",
		data() {
			return {
				guest: {
					guestName: '',
					guestText: '',
				},
				errors: {
					guestName: {
						error: 'Введите имя',
						show: false
					},
					guestText: {
						error: 'Введите сообщение',
						show: false
					}
				},
				showMessage: false,
				url: 'https://guest-book-ab475.firebaseio.com/entries.json'
			}
		},
		methods: {
			isFormValid() {
				let emptyFields = 0;
				for(let i in this.guest) {
					if(!this.guest[i]) {
						this.errors[i].show = true;
						setTimeout( () => {
							this.errors[i].show = false;
						}, 2000);
						emptyFields++;
					}
				}
				if(!emptyFields) {
					this.sendEntry();
					for(let i in this.guest) {
						this.guest[i] = '';
					}
					this.showMessage = true;
					setTimeout(() => {
						this.showMessage = false;
					}, 1500)
				}
			},
			sendEntry() {
				const ID = '_' + Math.random().toString(36).substr(2, 9);
				this.axios.post(this.url, {
					id: ID,
					name: this.guest.guestName,
					text:this.guest.guestText
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.fade-enter-active, .fade-leave-active {
		transition: opacity .5s;
	}
	.fade-enter, .fade-leave-to  {
		opacity: 0;
	}
	.message-form {
		position: relative;
		padding: 50px 10px;
		margin-bottom: 25px;
		background-color: $c-greyDark;
		color: $c-white;
		&__success {
			position: absolute;
			top: 10px;
			left: 50%;
			transform: translateX(-50%);
			color: $c-green;
		}
		&__content {
			max-width: 50%;
			margin: 0 auto;
		}
		&__group {
			position: relative;
			margin-bottom: 25px;
			padding-top: 25px;
		}
		&__label {
			color: $c-white;
			position: absolute;
			top: 0;
			left: 0;
			transition: .3s ease;
		}
		&__field {
			color: $c-white;
			width: 100%;
			border: none;
			border-bottom: 1px solid $c-white;
			padding: 10px;
			transition: .3s ease;
			&:focus,
			&:active {
				border-color: $c-red;
				+ .message-form__label {
					color: $c-red;
				}
			}
			&--error {
				border-color:  $c-red-error;
			}
		}
		&__btn {
			background-color: transparent;
			color: $c-white;
			width: 100%;
			padding: 15px;
			border: 1px solid $c-white;
			cursor: pointer;
			transition: .3s ease-in-out;
			border-radius: 5px;
			&:hover,
			&:focus,
			&:active {
				background-color: $c-red;
				border-color: $c-red;
			}
		}
		@include media('xs') {
			&__content {
				max-width: 100%;
			}
		}
	}
</style>