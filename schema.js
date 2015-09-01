var Schema = {
	// races: {
	// 	id: {type: 'increments', nullable: false, primary: true},
	// 	raceid: {type: 'integer', nullable: false, unsigned: true},
	// 	racer : {type: 'string', maxlength: 50, nullable: false},
	// 	track: {type: 'string', nullable: false}
	// },
	csracers: {
		racerid: {type: 'integer', nullable: false, unsigned: true},
		name: {type: 'string', maxlength: 50, nullable: false},
		rpm: {type: 'integer', nullable: false, unsigned: true},
		// created_at: {type: 'date', nullable: false},
		visits: {type: 'integer', nullable: false, unsigned: true},
		races: {type: 'integer', nullable: false, unsigned: true}
	}
};

module.exports = Schema;