import { useMutation, useQuery } from '@apollo/client';
import { Flex, FlexProps, IconButton, Text, Tooltip } from '@chakra-ui/react';
import { DownVoteIcon, UpVoteIcon, useToast } from '@codiga/codiga-components';
import { useUser } from '../../../renderer/components/UserContext';
import {
  AddVoteMutationVariables,
  ADD_VOTE,
  DeleteVoteMutationVariables,
  DELETE_VOTE,
} from '../../../renderer/graphql/mutations';
import { GET_RECIPE_VOTES_QUERY } from '../../../renderer/graphql/queries';
import { formatNumber } from '../../../renderer/utils/formatUtils';

type VotesProps = FlexProps & {
  entityId: number;
  entityType: 'Recipe';
  upvotes: number;
  downvotes: number;
};

const Votes = ({
  upvotes,
  downvotes,
  entityId,
  entityType = 'Recipe',
  ...props
}: VotesProps) => {
  const toast = useToast();
  const { id: userId } = useUser();

  const { data, refetch } = useQuery(GET_RECIPE_VOTES_QUERY, {
    skip: !userId,
    variables: {
      recipeId: entityId,
    },
  });

  const isUpVoted = Boolean(data?.votesData.isUpVoted);
  const isDownVoted = Boolean(data?.votesData.isDownVoted);
  const upVoteCount = Number(data?.votesData.upvotes);
  const downVoteCount = Number(data?.votesData.downvotes);
  const voteText = data ? upVoteCount - downVoteCount : upvotes - downvotes;

  const [addVote] = useMutation<void, AddVoteMutationVariables>(ADD_VOTE);
  const [deleteVote] = useMutation<void, DeleteVoteMutationVariables>(
    DELETE_VOTE
  );

  const handleUpVote = async () => {
    try {
      if (isUpVoted) {
        await deleteVote({ variables: { entityId, entityType } });
      } else {
        await addVote({ variables: { entityId, entityType, isUpvote: true } });
      }
      refetch();
      toast({
        status: 'success',
        description: 'Snippet upvoted',
      });
    } catch (err) {
      toast({
        status: 'error',
        description: 'An error occured while upvoting. Please refresh.',
      });
    }
  };

  const handleDownVote = async () => {
    try {
      if (isDownVoted) {
        await deleteVote({ variables: { entityId, entityType } });
      } else {
        await addVote({ variables: { entityId, entityType, isUpvote: false } });
      }
      refetch();
      toast({
        status: 'success',
        description: 'Snippet downvoted.',
      });
    } catch (err) {
      toast({
        status: 'error',
        description: 'An error occured while downvoting. Please refresh.',
      });
    }
  };

  const countColor = isUpVoted || isDownVoted ? 'rose.50' : undefined;

  return (
    <Flex gridGap="space_4" alignItems="center" {...props}>
      <Tooltip
        label="Please log in to upvote"
        shouldWrapChildren
        isDisabled={!!userId}
      >
        <IconButton
          isDisabled={!userId}
          minW="auto"
          boxSize="20px"
          variant="ghost"
          aria-label={`Upvote ${entityType.toLowerCase()}`}
          icon={
            <UpVoteIcon
              boxSize="16px"
              color={isUpVoted ? 'base.rose' : 'inherit'}
              fillRule={isUpVoted ? 'nonzero' : 'evenodd'}
            />
          }
          onClick={handleUpVote}
        />
      </Tooltip>
      <Text lineHeight="20px" color={countColor} _dark={{ color: countColor }}>
        {formatNumber(voteText)}
      </Text>
      <Tooltip
        label="Please log in to downvote"
        shouldWrapChildren
        isDisabled={!!userId}
      >
        <IconButton
          isDisabled={!userId}
          minW="auto"
          boxSize="20px"
          variant="ghost"
          aria-label={`Downvote ${entityType.toLowerCase()}`}
          icon={
            <DownVoteIcon
              boxSize="16px"
              color={isDownVoted ? 'base.rose' : 'inherit'}
              fillRule={isDownVoted ? 'nonzero' : 'evenodd'}
            />
          }
          onClick={handleDownVote}
        />
      </Tooltip>
    </Flex>
  );
};

export default Votes;
