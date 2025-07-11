import { AbilityBuilder, createMongoAbility } from '@casl/ability';

function defineAbilitiesFor(role) {
  const { can, cannot, build } = new AbilityBuilder(createMongoAbility);

  if (role === 'admin') {
    can('manage', 'all'); 
  } 
  
  else if (role === 'user') {
    can('read', 'Notice');
    can('create', 'Complaint');
    cannot('create', 'Notice');
  }

  else if (role == 'gaurd'){
     can('read', 'visitor');
    can('create', 'visitor');
  }

  return build();
}

export default defineAbilitiesFor