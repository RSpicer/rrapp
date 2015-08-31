var Schema = {
	races: {
		id: {type: 'increments', nullable: false, primary: true},
		raceid: {type: 'integer', nullable: false, unsigned: true},
		racer : {type: 'string', maxlength: 50, nullable: false},
		track: {type: 'string', nullable: false}
	}
};

module.exports = Schema;