pragma solidity ^0.5.0;

contract Aubis {
	constructor() public{

	}
	struct Egyption{
		string name;
		bool alive;
	}

	struct Pryamid {
		address pharaoh;
		address challenger;
		uint pryamidHeight;
		bool inChanllenge;
	}

	mapping(uint=>address) public Jesus;
	mapping(address=>Egyption) public Maat;
	mapping(uint=>Pryamid) public Sahara;

	uint public pryamidCounter = 0;
	uint public population = 0;

	function createEgyption(address _id, string memory _name) public returns(string memory) {
		bool addUsed = false;
		for (uint i=0; i < population; i++){
			if (_id == Jesus[i]){
				addUsed = true;
			}
		}
		if (!addUsed){
			bool nameRepeat = false;
			for (uint i=0; i < population; i++){
				if (keccak256(abi.encode(_name))== keccak256(abi.encode(Maat[Jesus[i]].name))){
					nameRepeat = true;
				}
			}
			if (!nameRepeat){
			 	Jesus[population] = _id;
				population++;
			 	Maat[_id] = Egyption(_name, true);
				return "Succeed!!";
			} else {
				return "Name repeated!!";
			} 
		} else {
			return "Address has been registed!!";
		}
	}

	function getName(address _id) public returns (string memory) {
		return Maat[_id].name;
	}

	//////////////////////////////
	mapping(uint=>uint8[]) BattleHistory;
	// {AC = 0, AB = 1, BC = 2, BB = 3}
	mapping(uint=>uint8) BattleRound;
	mapping(uint=>uint) PryamidClock;

	event Battle(address _kingId, address _playerId);
	event PharaohDone(uint _pryamidNumber, uint _i);
	event ChanllengerDone(uint _pryamidNumber, uint _i);

	function createPryamid(address _id, uint _height) public {
		// Transactions!
		Sahara[pryamidCounter] = Pryamid(_id, address(0), _height, false);
		PryamidClock[pryamidCounter] = 0; 
		pryamidCounter++;
	}

	function destroyPryamid(uint _pryamidNumber) public {
		delete Sahara[_pryamidNumber];
		delete BattleHistory[_pryamidNumber];
	}

	function goIntoPryamid(address _id, uint _pryamidNumber) public returns (string memory){
		require(_pryamidNumber < pryamidCounter);
		if (Sahara[_pryamidNumber].inChanllenge)
			return "In Chanllenge...";
		if (_id == Sahara[_pryamidNumber].pharaoh)
			return "Cannot play with yourself...";
		Sahara[_pryamidNumber].challenger = _id;
		Sahara[_pryamidNumber].inChanllenge = true;
		BattleHistory[_pryamidNumber] = new uint8[](5);
		BattleRound[_pryamidNumber] = 0;
		emit Battle(Sahara[_pryamidNumber].pharaoh, _id);
	}

	function selectCard(address _id, uint _pryamidNumber, bool _isCivilian) public{
		if (Sahara[_pryamidNumber].pharaoh == _id){
			//if (_isValidMove())
			if(_isCivilian) BattleHistory[_pryamidNumber][BattleRound[_pryamidNumber]] += 2;
			//emit PharaohDone(_pryamidNumber, BattleRound[_pryamidNumber]);
		} else if (Sahara[_pryamidNumber].challenger == _id){
			//if (_isValidMove())
			if(_isCivilian) BattleHistory[_pryamidNumber][BattleRound[_pryamidNumber]] += 1;
			//emit ChanllengerDone(_pryamidNumber, BattleRound[_pryamidNumber]);
		}
	}

	function judge(uint _pryamidNumber) public returns (address){
		bool end_game = false;
		address winner;
		address loser;
		for (uint i=0; i < BattleRound[_pryamidNumber]; i++){
			
			if (BattleHistory[_pryamidNumber][i] == 0){
				end_game = true;
				winner = Sahara[_pryamidNumber].challenger;
				loser = Sahara[_pryamidNumber].pharaoh;
				_updateClock(_pryamidNumber, true);
			} else if (BattleHistory[_pryamidNumber][i] < 3){
				end_game = true;
				loser = Sahara[_pryamidNumber].challenger;
				winner = Sahara[_pryamidNumber].pharaoh;
				_updateClock(_pryamidNumber, false);
			}
		}

		if (end_game){
			//Transaction!
			_updatePryamid(_pryamidNumber, winner);
			//Check winner if constitute winning...j
			return winner;
		} else {
			return address(0);
		}
	}

	function _updateClock(uint _pryamidNumber, bool _reset) private {
		if(_reset){
			PryamidClock[_pryamidNumber] += 1;
		} else {
			PryamidClock[_pryamidNumber] = 0;
		}
	}

	function _updatePryamid(uint _pryamidNumber, address _id) private {
		Sahara[_pryamidNumber].pharaoh = _id;
		Sahara[_pryamidNumber].challenger = address(0);
		Sahara[_pryamidNumber].inChanllenge = false;
	}

	function _isValidMove(uint8[] memory _battleHistory, uint8 _battleRound, uint8 _cardType, bool _isKing) private returns (bool){
		return true;
	}

	function pryamidEndgame(uint _pryamidNumber) public returns (bool){
		return (PryamidClock[_pryamidNumber] > 3);
	}

}









