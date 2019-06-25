pragma solidity ^0.5.0;

contract Anubis {
	constructor() public{
		address p1 = 0xB97AEc1AD0C971C8F29Fca47a2fC4cf2369Ec710;
		address p2 = 0xa23d7c5aE0410e723d43978d66DD29eD9Cb3C5D1;
		createEgyption(p1, "Kologormov");
		createEgyption(p2, "Einstein");
		createPyramid(p1, 1000);
		goIntoPyramid(p2, 0);
		selectCard(p1, 1, true);
		selectCard(p2, 1, true);
		//selectCard(p1, 1, true);
		//selectCard(p2, 1, false);
		//judge(1);
	}
	struct Egyption {
		string name;
		bool alive;
		uint location;
	}

	struct Pyramid {
		address pharaoh;
		address challenger;
		uint32 pyramidHeight;
		uint32 pyramidClock;
		uint8 round;
		bool inChallenge;
		bool pharaoh_Done;
		bool challenger_Done;
	}

	mapping(uint=>address) public Jesus;
	mapping(address=>Egyption) public Maat;
	mapping(uint=>Pyramid) public Sahara;
	mapping(uint=>uint8[]) private BattleHistory; // {AC = 0, AB = 1, BC = 2, BB = 3}

	uint public pyramidCounter = 1;
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
			 	Maat[_id] = Egyption({name: _name,
			 						  alive: true,
			 						  location: 0});
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

	event Battle(address _kingId, address _playerId);

	function createPyramid(address _id, uint32 _height) public {
		// Transactions!
		Maat[_id].location = pyramidCounter;
		Sahara[pyramidCounter] = Pyramid({pharaoh: _id, 
										 challenger: address(0), 
										 pyramidHeight: _height, 
										 pyramidClock: 0, 
										 round: 0,  
										 inChallenge: false, 
										 pharaoh_Done: false, 
										 challenger_Done: false});
		BattleHistory[pyramidCounter] = new uint8[](0);
		for (uint i=0; i<5; i++){
			BattleHistory[pyramidCounter].push(0);
		}
		Sahara[pyramidCounter].pyramidClock = 0;
		pyramidCounter++;
	}

	function destroyPyramid(uint _pyramidNumber) public {
		delete Sahara[_pyramidNumber];
	}	

	function getmyPyramid(address _id) public returns(uint) {
		return Maat[_id].location;
	}

	function goIntoPyramid(address _id, uint _pyramidNumber) public returns (string memory){
		require(_pyramidNumber < pyramidCounter);
		if (Sahara[_pyramidNumber].inChallenge)
			return "In Challenge...";
		if (_id == Sahara[_pyramidNumber].pharaoh)
			return "Cannot play with yourself...";
		// Transaction!
		Maat[_id].location = _pyramidNumber;
		Sahara[_pyramidNumber].challenger = _id;
		Sahara[_pyramidNumber].inChallenge = true;
		Sahara[_pyramidNumber].round = 0;
		BattleHistory[_pyramidNumber] = new uint8[](0);
		for (uint i=0; i<5; i++){
			BattleHistory[_pyramidNumber].push(0);
		}
		//emit Battle(Sahara[_pyramidNumber].pharaoh, _id);
		return "Starting...";
	}

	function selectCard(address _id, uint _pyramidNumber, bool _isCivilian) public {
		if (Sahara[_pyramidNumber].pharaoh == _id){
			if (_isValidMove(BattleHistory[_pyramidNumber], Sahara[_pyramidNumber].round, true, _isCivilian)){
				if(_isCivilian) BattleHistory[_pyramidNumber][Sahara[_pyramidNumber].round] += 2;
				Sahara[_pyramidNumber].pharaoh_Done = true;
			}
			//emit PharaohDone(_pyramidNumber, Sahara[_pyramidNumber].round);
		} else if (Sahara[_pyramidNumber].challenger == _id){
			if (_isValidMove(BattleHistory[_pyramidNumber], Sahara[_pyramidNumber].round, true, _isCivilian)){
				if(_isCivilian) BattleHistory[_pyramidNumber][Sahara[_pyramidNumber].round] += 1;
				Sahara[_pyramidNumber].challenger_Done = true;
			}
			//emit ChallengerDone(_pyramidNumber, Sahara[_pyramidNumber].round);
		}

		if (Sahara[_pyramidNumber].pharaoh_Done && Sahara[_pyramidNumber].challenger_Done) {
			Sahara[_pyramidNumber].round += 1;
			Sahara[_pyramidNumber].pharaoh_Done = false;
			Sahara[_pyramidNumber].challenger_Done = false;
			judge(_pyramidNumber);
		}
	}

	function getBattleHistory(uint _pyramidNumber, uint _round) public returns(uint){
		if (_round < Sahara[_pyramidNumber].round){
			return BattleHistory[_pyramidNumber][_round];
		} else {
			return 4;
		}		 
	}

	//event Judge(uint _pyramidNumber);
	function judge(uint _pyramidNumber) public returns (address){
		//emit Judge(_pyramidNumber);
		bool end_game = false;
		address winner;
		address loser;
		for (uint i=0; i < Sahara[_pyramidNumber].round; i++){
			if (BattleHistory[_pyramidNumber][i] == 0){
				end_game = true;
				winner = Sahara[_pyramidNumber].challenger;
				loser = Sahara[_pyramidNumber].pharaoh;
				_updateClock(_pyramidNumber, true);
			} else if (BattleHistory[_pyramidNumber][i] < 3){
				end_game = true;
				loser = Sahara[_pyramidNumber].challenger;
				winner = Sahara[_pyramidNumber].pharaoh;
				_updateClock(_pyramidNumber, false);
			}
		}

		if (end_game){
			//Transaction!
			Maat[winner].location = _pyramidNumber;
			Maat[loser].location = 0;
			_updatePyramid(_pyramidNumber, winner);
			//Check winner if constitute winning...
			return winner;
		} else {
			return address(0);
		}
	}

	function _updateClock(uint _pyramidNumber, bool _reset) private {
		if(_reset){
			Sahara[_pyramidNumber].pyramidClock += 1;
		} else {
			Sahara[_pyramidNumber].pyramidClock = 0;
		}
		_pyramidEndGame(_pyramidNumber);
	}

	function _updatePyramid(uint _pyramidNumber, address _id) private {
		Sahara[_pyramidNumber].pharaoh = _id;
		Sahara[_pyramidNumber].challenger = address(0);
		Sahara[_pyramidNumber].inChallenge = false;
	}

	function _isValidMove(uint8[] storage _battleHistory, uint8 _battleRound, bool _isPharaoh, bool _isCivilian) private returns (bool){
		return true;
	}

	function _pyramidEndGame(uint _pyramidNumber) private returns (bool){
		if (Sahara[_pyramidNumber].pyramidClock > 3){
			// Transactions!
			destroyPyramid(_pyramidNumber);
		}
	}

}









