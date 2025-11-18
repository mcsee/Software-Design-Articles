test04BoundaryRecipients

  | recipients |
  recipients := OrderedCollection new.
  1 to: 
  10 do:
    [:index | recipients add: 
      ('john', index asString, '@example.com')].

  self deny: (EmailMessage forRecipients: recipients) isValid