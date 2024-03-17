<template>
  <div>
    <h1 class="PageTitle">Add a contact</h1>
    <div class="flex justify-center w-full">
      <form action="" class="w-full">
        <div class="flex flex-row justify-center mx-auto">
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

        <div class="w-full flex-row justify-end my-3">
          <button class="btn btn-primary mx-1">Sauvegarder</button>
          <button class="btn btn-outline btn-error mx-1">Annuler</button>
        </div>
      </form>
    </div>
  </div>
</template>
