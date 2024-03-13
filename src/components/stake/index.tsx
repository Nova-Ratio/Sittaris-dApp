import Modal from "../tailwind/Modal";
import InputText from "../tailwind/input";
import { Token } from "../token";

export function StakeModal({
  modal,
  setModal,
  amount,
  setAmount,
}: {
  modal: boolean;
  setModal: any;
  amount: number;
  setAmount: any;
}) {
  return (
    <Modal title="Stake SIT TOKEN" modal={modal} setModal={setModal}>
      <div className="w-[40vw] min-h-52 flex flex-col items-center pt-8">
        <div className="w-2/3 h-fit flex flex-col gap-6">
          <div className="card 2xl:p-6">
            <h4>Amount of Payment</h4>
            <div className="flex gap-4 items-center">
              <Token amount={"SIT"} />
              <InputText
                type="text"
                onChange={(e: any) => setAmount(Number(e.target.value) || 0)}
                value={amount}
                addClass="text-right"
                placeholder="0.00"
              />
            </div>
            <div className="flex justify-between items-center">
              <h5 className="dark:text-white/50 text-black/50">
                balance: 30000 SIT
              </h5>
              <div className="flex gap-3 ">
                <button className="outlineBtn dark:border-white/60 border-black/60 !text-sm">
                  Half
                </button>
                <button className="outlineBtn dark:border-white/60 border-black/60 !text-sm">
                  Max
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            {[30, 60, 90].map((item, index) => (
              <button
                key={index}
                className="dark:text-white/50 text-black/50 border hover:text-black dark:hover:text-white dark:border-white/20 border-black/20 rounded-lg py-2"
              >
                {item} Days
              </button>
            ))}
            <div className="col-span-2 relative flex items-center">
              <InputText type="text" placeholder="1" />
              <span className="absolute right-3 text-black/60 dark:text-white/60 ">
                Days
              </span>
            </div>
          </div>
          <div className="card 2xl:p-6">
            <h4>Amount to be Received</h4>
            <div className="flex gap-3 justify-between items-center ">
              <div className="relative flex items-center">
                <InputText type="text" placeholder="1" />
                <span className="absolute right-3 text-black/60 dark:text-white/60 ">
                  Days
                </span>
              </div>
              <Token amount="SIT" />
            </div>
          </div>
          <div className="flex w-full justify-end ">
            <button className="inlineBtn w-1/2 2xl:text-xl">Stake</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function UnstakeModal({
  unstakeModal,
  setUnstakeModal,
  amount,
  setAmount,
}: {
  unstakeModal: boolean;
  setUnstakeModal: any;
  amount: number;
  setAmount: any;
}) {
  return (
    <Modal
      title="Unstake SIT Token"
      modal={unstakeModal}
      setModal={setUnstakeModal}
    >
      <div className="w-[40vw] min-h-52 flex flex-col items-center pt-8">
        <div className="w-2/3 h-fit flex flex-col gap-6">
          <div className="card 2xl:p-6">
            <div className="flex gap-4 items-center justify-between text-xl">
              <Token amount={"SIT"} />
              3000
            </div>
            <div className="flex justify-between items-center pt-3 font-normal text-sm">
              <h5 className="">balance: 30000 SIT</h5>

              <h5 className="">Unstaking Period: 21 Days</h5>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3">
            {[25, 50, 75].map((item, index) => (
              <button
                key={index}
                className="dark:text-white/50 text-black/50 border hover:text-black dark:hover:text-white dark:border-white/20 border-black/20 rounded-lg py-2"
              >
                {item}%
              </button>
            ))}
            <button className="dark:text-white/50 text-black/50 border hover:text-black dark:hover:text-white dark:border-white/20 border-black/20 rounded-lg py-2">
              Max
            </button>
            <div className="col-span-2 relative flex items-center">
              <InputText type="text" placeholder="1" />
              <span className="absolute right-3 text-black/60 dark:text-white/60 ">
                SIT
              </span>
            </div>
          </div>

          <div className="flex w-full justify-end ">
            <button className="inlineBtn w-1/2 2xl:text-xl">Unstake</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export function BottomGrid({
  setModal,
  setUnstakeModal,
}: {
  setModal: any;
  setUnstakeModal: any;
}) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="card">
        <div className="flex gap-3 items-center w-full justify-between">
          <h4>Total Staking SIT Token</h4>
          <Token amount={12500} />
        </div>
        <div className="flex gap-6">
          <div>
            <h5 className="dark:text-white/50 text-black/50">
              Unstaking Period
            </h5>
            <span>21 Days</span>
          </div>
          <div>
            <h5 className="dark:text-white/50 text-black/50">Reward</h5>
            <Token amount={"SIT"} addClass="!text-sm" width={16} height={16} />
          </div>
        </div>
      </div>
      <div className="card">
        <div className="flex gap-3 items-center w-full justify-between">
          <h4>Current Staking Data</h4>
          <Token amount={3000} />
        </div>
        <div className="flex gap-3 items-center w-full justify-between">
          <div className="border rounded dark:border-white/10 border-black/10 px-3 py-1">
            30 Days
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setUnstakeModal(true)}
              className="outlineBtn"
            >
              Unstake
            </button>
            <button onClick={() => setModal(true)} className="inlineBtn">
              Stake
            </button>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="flex gap-3 items-center w-full justify-between">
          <h4>Rewards</h4>
          <Token amount={10000} />
        </div>
        <div className="flex justify-between items-center gap-6">
          <div>
            <h5 className="dark:text-white/50 text-black/50">
              Reward Distribution Time:
            </h5>
            <span>29 Days 08 Hours 49 Minutes 12 Seconds</span>
          </div>
          <button className="inlineBtn">Claim</button>
        </div>
      </div>
      <div className="card">
        <div className="flex gap-3 items-center w-full justify-between">
          <h4>Unstaking</h4>
          <Token amount={10000} />
        </div>
        <div className="flex justify-between items-center gap-6">
          <div>
            <h5 className="dark:text-white/50 text-black/50">
              Remaining Time:
            </h5>
            <span>17 Days 08 Hours 49 Minutes 12 Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}
