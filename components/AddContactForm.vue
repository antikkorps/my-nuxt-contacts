<template>
  <div>
    <h1 class="PageTitle">Add a contact</h1>
    <div class="flex justify-center w-full">
      <form action="" class="w-full">
        <div class="flex flex-col sm:flex-row justify-around mx-auto">
          <label class="form-control w-full max-w-xs mx-1">
            <div class="label">
              <span class="label-text">Firstname</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </label>

          <label class="form-control w-full max-w-xs mx-1">
            <div class="label">
              <span class="label-text">Lastname</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <div class="flex flex-col sm:flex-row justify-center mx-auto">
          <label class="form-control w-full max-w-xs mx-1">
            <div class="label">
              <span class="label-text">Email</span>
            </div>
            <input
              type="email"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </label>

          <div class="form-control w-full sm:w-1/2">
            <label class="cursor-pointer label">
              <span class="label-text">Ajouter aux favoris</span>
              <input type="checkbox" class="toggle toggle-primary" />
            </label>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row justify-around mx-auto">
          <label class="form-control w-full max-w-xs mx-1">
            <div class="label">
              <span class="label-text">Fixe</span>
            </div>
            <input
              type="phone"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </label>

          <label class="form-control w-full max-w-xs mx-1">
            <div class="label">
              <span class="label-text">Mobile</span>
            </div>
            <input
              type="phone"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <div class="w-full flex-row justify-end my-3">
          <button class="btn btn-primary mx-1">Sauvegarder</button>
          <button class="btn btn-outline btn-error mx-1">
            <NuxtLink to="/mycontacts">Annuler</NuxtLink>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
