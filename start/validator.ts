/*
|--------------------------------------------------------------------------
| Validator file
|--------------------------------------------------------------------------
|
| The validator file is used for configuring global transforms for VineJS.
| The transform below converts all VineJS date outputs from JavaScript
| Date objects to Luxon DateTime instances, so that validated dates are
| ready to use with Lucid models and other parts of the app that expect
| Luxon DateTime.
|
*/

import { DateTime } from 'luxon'
import vine, { VineDate, SimpleMessagesProvider } from '@vinejs/vine'

declare module '@vinejs/vine/types' {
  interface VineGlobalTransforms {
    date: DateTime
  }
}

VineDate.transform((value) => DateTime.fromJSDate(value))


vine.messagesProvider = new SimpleMessagesProvider(
  {
    required: 'Le champ {{ field }} est obligatoire',
    string: 'Le champ {{ field }} doit être un texte',
    email: "L'adresse e-mail n'est pas valide",
    minLength: 'Le champ {{ field }} doit contenir au moins {{ min }} caractères',
    maxLength: 'Le champ {{ field }} ne peut pas dépasser {{ max }} caractères',
    confirmed: 'Les deux mots de passe ne correspondent pas',
    'database.unique': 'Cette valeur est déjà utilisée',
    url: 'Le champ {{ field }} doit être une adresse web valide',
  },
  {
    email: 'e-mail',
    password: 'mot de passe',
    fullName: 'nom complet',
    passwordConfirmation: 'confirmation du mot de passe',
  }
)