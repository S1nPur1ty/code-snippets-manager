import { gql } from '@apollo/client';

export const CHECK_USER = gql`
  query checkUser {
    user {
      id
      username
      accountType
      preferences {
        key
        value
      }
    }
  }
`;

export const GET_USER_PREFERENCES = gql`
  query getUserPreferences {
    user {
      id
      preferences {
        key
        value
      }
    }
  }
`;

export const GET_USER_RECIPES = gql`
  query getUserRecipes(
    $howmany: Long!
    $skip: Long!
    $language: LanguageEnumeration
    $name: String
    $tag: String
    $orderBy: AssistantRecipeQueryOrderBy
    $desc: Boolean
  ) {
    user {
      id
      recipes: assistantRecipes(
        howmany: $howmany
        skip: $skip
        language: $language
        name: $name
        tag: $tag
        orderBy: $orderBy
        desc: $desc
      ) {
        id
        name
        description
        isPublic
        isSubscribed
        filenamePatterns
        keywords
        dependencyConstraints {
          name
        }
        owner {
          id
          hasSlug
          slug
          displayName
        }
        tags
        code
        presentableFormat
        imports
        language
        creationTimestampMs
        upvotes
        downvotes
      }
    }
  }
`;

export const GET_USER_COOKBOOKS = gql`
  query getUserCookbooks(
    $howmany: Long!
    $skip: Long!
    $orderBy: AssistantCookbookQueryOrderBy
    $name: String
    $desc: Boolean
  ) {
    user {
      id
      cookbooks: assistantCookbooks(
        howmany: $howmany
        skip: $skip
        name: $name
        orderBy: $orderBy
        desc: $desc
      ) {
        id
        name
        description
        isPublic
        isSubscribed
        creationTimestampMs
        owner {
          id
          hasSlug
          slug
          displayName
        }
        upvotes
        downvotes
        recipesCount(name: $name)
      }
      cookbooksCount: assistantCookbooksCount(name: $name)
      isAnyCookbook: assistantCookbooks(howmany: 1, skip: 0) {
        id
      }
    }
  }
`;

export const GET_USER_SUBSCRIBED_RECIPES = gql`
  query getUserSubscribedRecipes(
    $howmany: Long!
    $skip: Long!
    $name: String
    $orderBy: AssistantRecipeQueryOrderBy
    $desc: Boolean
  ) {
    user {
      id
      recipes: assistantRecipesSubscribed(
        howmany: $howmany
        skip: $skip
        name: $name
        orderBy: $orderBy
        desc: $desc
      ) {
        id
        name
        description
        isPublic
        isSubscribed
        filenamePatterns
        keywords
        tags
        code
        presentableFormat
        imports
        language
        creationTimestampMs
        dependencyConstraints {
          name
        }
        uses
        owner {
          id
          hasSlug
          slug
          displayName
        }
        upvotes
        downvotes
      }
      recipesCount: assistantRecipesSubscribedCount(name: $name)
      isAnyRecipe: assistantRecipesSubscribed(howmany: 1, skip: 0) {
        id
      }
    }
  }
`;

export const GET_USER_SUBSCRIBED_COOKBOOKS = gql`
  query getUserSubscribedCookbooks(
    $howmany: Long!
    $skip: Long!
    $orderBy: AssistantCookbookQueryOrderBy
    $desc: Boolean
    $name: String
  ) {
    user {
      id
      cookbooks: assistantCookbooksSubscribed(
        howmany: $howmany
        skip: $skip
        name: $name
        orderBy: $orderBy
        desc: $desc
      ) {
        id
        name
        description
        isPublic
        isSubscribed
        creationTimestampMs
        recipesCount
        owner {
          id
          hasSlug
          slug
          displayName
        }
        upvotes
        downvotes
      }
      isAnyCookbook: assistantCookbooksSubscribed(howmany: 1, skip: 0) {
        id
      }
      cookbooksCount: assistantCookbooksSubscribedCount(name: $name)
    }
  }
`;

export const GET_SHARED_RECIPES = gql`
  query sharedRecipes(
    $languages: [LanguageEnumeration!]
    $tag: String
    $keyword: String
    $howmany: Long!
    $desc: Boolean
    $orderBy: AssistantRecipeQueryOrderBy
    $name: String
    $groupId: Long
    $skip: Long!
  ) {
    recipes: sharedRecipes(
      languages: $languages
      tag: $tag
      keyword: $keyword
      howmany: $howmany
      desc: $desc
      orderBy: $orderBy
      name: $name
      groupId: $groupId
      skip: $skip
    ) {
      id
      name
      keywords
      tags
      language
      code
      presentableFormat
      dependencyConstraints {
        name
      }
      groups {
        id
        name
      }
      creationTimestampMs
      owner {
        id
        hasSlug
        slug
        displayName
      }
      upvotes
      downvotes
      isPublic
      isSubscribed
    }
    sharedRecipesCount(
      languages: $languages
      tag: $tag
      keyword: $keyword
      name: $name
      groupId: $groupId
    )
  }
`;

export const GET_SHARED_COOKBOOKS = gql`
  query sharedCookbooks(
    $howmany: Long!
    $desc: Boolean
    $orderBy: AssistantCookbookQueryOrderBy
    $name: String
    $groupId: Long
    $skip: Long!
  ) {
    cookbooks: sharedCookbooks(
      howmany: $howmany
      desc: $desc
      orderBy: $orderBy
      name: $name
      groupId: $groupId
      skip: $skip
    ) {
      id
      name
      isPublic
      isSubscribed
      recipesCount
      creationTimestampMs
      groups {
        id
        name
      }
      owner {
        id
        hasSlug
        slug
        displayName
      }
      upvotes
      downvotes
    }
    sharedCookbooksCount(name: $name, groupId: $groupId)
  }
`;
