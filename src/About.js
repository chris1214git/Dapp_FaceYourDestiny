import React, { Component } from 'react';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <p>Face your desitny</p>
                <p dir="ltr">遊戲方法:（帝王撲克）</p>
                <p dir="ltr">1.每一個獎池，會有一個國王，持國王牌組，挑戰者持奴隸牌組。</p>
                <ul>
                    <li dir="ltr">國王牌組中有一個國王牌和四個平民牌</li>
                    <li dir="ltr">奴隸牌組中有一個奴隸牌和四個平民牌</li>
                </ul>
                <p dir="ltr">2.國王&gt;平民 平民&gt;奴隸 奴隸&gt;國王,每人同時出一張牌，如果都是平民則繼續，一旦分出勝負即結束。</p>
                <p dir="ltr">3.挑戰者一次一人，每張牌出牌時間不得超過30秒,出牌前後可發表情 嘲諷、迷惑對手,表情包括：邪惡、大笑、投降、愛心</p>
                <p dir="ltr">4.當入場挑戰時，入場費20%給國王、70%給獎池、10%落入遊戲做額外分配(抽獎、分紅),當國王超過二十分鐘沒有被擊敗，則獲得大獎池</p>
                <p dir="ltr">5.分紅規則:</p>
                <p dir="ltr">對戰勝場數最高的前10%玩家分額外紅利,每個月一次，消費超過平均值的玩家有抽獎機會，可以躍昇成大富翁（每個人在玩遊戲的時候會播一些前給遊戲，提供這個抽獎的籌碼）</p>
                <p>&nbsp;</p>
                <p dir="ltr">*** 對戰贏超過N場後可獲得不同logo，每個人可製作自己的logo</p>
            </div>
        );
    }
}

export default About;