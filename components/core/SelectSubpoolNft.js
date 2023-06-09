import { formatEther } from "ethers/lib/utils";
import { useAccount } from "wagmi";
import { useNfts } from "../../hooks/useNfts";
import { useSubpools } from "../../hooks/useSubpools";
import { generateMerkleProof } from "../../utils/generateMerkleProof";

import juccimonkeyRankings from "../../rankings/juccimonkeys.json";
import { useEffect } from "react";

const addressToRankings = {
  ["0x2cf7C053aAA8564c7B5528DF2EC6B08473ef6902"]: juccimonkeyRankings
};

export const SelectSubpoolNft = ({
  onChange,
  value,
  tokenAddress,
  address,
  hideFirstNft,
  filterZeroNftReserveSubpools,
}) => {
  const [subpools, poolAddress, subpoolsLoading] = useSubpools({
    tokenAddress,
  });
  const [nfts, loading] = useNfts({
    address,
    tokenAddress,
  });

  const rankings = addressToRankings[tokenAddress];

  const rankedNfts = nfts.reduce((arr, nft) => {
    const bin = rankings[nft.tokenId] - 1;

    if (arr[bin]) arr[bin].push(nft);
    else arr[bin] = [nft];
    return arr;
  }, []);

  useEffect(() => {
    onChange({});
  }, [tokenAddress]);

  return (
    <div>
      <b>Select some nfts</b>

      {(loading || subpoolsLoading) && <p>Loading...</p>}

      <div>
        {subpools &&
          !subpoolsLoading &&
          !loading &&
          rankedNfts.map(
            (nfts, index) =>
              (!hideFirstNft || nfts.length > 1) &&
              (!filterZeroNftReserveSubpools ||
                subpools[index].nftReserves.gt("0")) && (
                <div key={index}>
                  <h4>
                    subpool-{index + 1} : current price{" "}
                    {formatEther(subpools[index]?.price || "1")} ether : (
                    {value[index]?.tokens.length || 0} selected)
                  </h4>

                  <div style={{ maxHeight: 200, overflow: "auto" }}>
                    {nfts
                      .slice(hideFirstNft ? 1 : 0)
                      .map(({ image, tokenId }) => {
                        const currentInput = value[index];
                        const selected = currentInput?.tokens.some(
                          (v) => tokenId === v.tokenId
                        );

                        return (
                          <img
                            height={60}
                            src={image}
                            key={tokenId}
                            style={{
                              marginRight: 4,
                              cursor: "pointer",
                              border: selected
                                ? "2px solid red"
                                : "2px solid transparent",
                            }}
                            onClick={() => {
                              if (selected) {
                                currentInput.tokens =
                                  currentInput.tokens.filter(
                                    (v) => v.tokenId != tokenId
                                  );
                              } else {
                                const token = {
                                  tokenId,
                                  proof: generateMerkleProof(
                                    tokenId,
                                    rankings,
                                    index
                                  ),
                                };

                                if (currentInput) {
                                  currentInput.tokens.push(token);
                                } else {
                                  currentInput = {
                                    tokens: [token],
                                    subpoolId: index,
                                  };
                                }
                              }

                              onChange({ ...value, [index]: currentInput });
                            }}
                          />
                        );
                      })}
                  </div>
                </div>
              )
          )}
      </div>
    </div>
  );
};
