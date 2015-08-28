var Schema = {
	race: {
		id: {type: 'increments', nullable: false, primary: true},
		racer : {type: 'string', maxlength: 50, nullable: false},
		raceid: {type: 'integer', nullable: false, unsigned: true},
		track: {type: 'string', nullable: false}
	}
};

module.exports = Schema;