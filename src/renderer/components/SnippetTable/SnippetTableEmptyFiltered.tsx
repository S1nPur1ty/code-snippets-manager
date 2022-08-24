import { Button, Flex, Link } from '@chakra-ui/react';
import { EmptyState } from '@codiga/codiga-components';
import { APP_URL } from '../../../renderer/lib/config';
import { useFilters } from '../FiltersContext';

export default function SnippetTableEmptyFiltered() {
  const { resetAllFilters } = useFilters();

  return (
    <EmptyState
      title="No snippets match that criteria"
      description="You don't have any snippets that match your filter criteria."
      illustration="empty"
      py="space_64"
    >
      <Flex gridGap="space_16">
        <Button variant="secondary" size="sm" onClick={resetAllFilters}>
          Clear Filters
        </Button>
        <Link
          isExternal
          href={`${APP_URL}/assistant/snippet/create`}
          variant="primary"
          size="sm"
        >
          Create Snippet
        </Link>
      </Flex>
    </EmptyState>
  );
}
