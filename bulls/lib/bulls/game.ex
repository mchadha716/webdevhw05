defmodule Bulls.Game do


  def new do
    %{
      secret: makeSecret(MapSet.put(MapSet.new(), Enum.random(1..9)), 1),
      guesses: MapSet.new,
    }
  end

  def guess(st, num) do
    if String.length(num) == 4 and uniqChars(num) and Regex.match?(~r/^\d+$/, num) do
      %{st | guesses: MapSet.put(st.guesses, num) }
    else
      raise "invalid guess"
    end
  end

  def uniqChars(num) do
    if String.at(num, 0) == String.at(num, 1)
    or String.at(num, 0) == String.at(num, 2)
    or String.at(num, 0) == String.at(num, 3)
    or String.at(num, 1) == String.at(num, 2)
    or String.at(num, 1) == String.at(num, 3)
    or String.at(num, 2) == String.at(num, 3) do
      false
    else
      true
    end
  end

  def view(st) do

    guesses = MapSet.to_list(st.guesses)

    if (length(guesses) > 0) do
      guess = Enum.at(guesses, 0)
      {bulls, cows} = calcBullsCows(guess, st.secret)
      %{
        guess: guess,
        bullsandcows: "#{bulls}B#{cows}C"
      }
    end

    if (length(guesses) > 1) do
      guess = Enum.at(guesses, 1)
      {bulls, cows} = calcBullsCows(guess, st.secret)
      %{
        guess: guess,
        bullsandcows: "#{bulls}B#{cows}C"
      }
    end

    if (length(guesses) > 2) do
      guess = Enum.at(guesses, 2)
      {bulls, cows} = calcBullsCows(guess, st.secret)
      %{
        guess: guess,
        bullsandcows: "#{bulls}B#{cows}C"
      }
    end

    if (length(guesses) > 3) do
      guess = Enum.at(guesses, 3)
      {bulls, cows} = calcBullsCows(guess, st.secret)
      %{
        guess: guess,
        bullsandcows: "#{bulls}B#{cows}C"
      }
    end

    if (length(guesses) > 4) do
      guess = Enum.at(guesses, 4)
      {bulls, cows} = calcBullsCows(guess, st.secret)
      %{
        guess: guess,
        bullsandcows: "#{bulls}B#{cows}C"
      }
    end

    if (length(guesses) > 5) do
      guess = Enum.at(guesses, 5)
      {bulls, cows} = calcBullsCows(guess, st.secret)
      %{
        guess: guess,
        bullsandcows: "#{bulls}B#{cows}C"
      }
    end

    if (length(guesses) > 6) do
      guess = Enum.at(guesses, 6)
      {bulls, cows} = calcBullsCows(guess, st.secret)
      %{
        guess: guess,
        bullsandcows: "#{bulls}B#{cows}C"
      }
    end

    if (length(guesses) > 7) do
      guess = Enum.at(guesses, 7)
      {bulls, cows} = calcBullsCows(guess, st.secret)
      %{
        guess: guess,
        bullsandcows: "#{bulls}B#{cows}C"
      }
    end
  end

  def calcBullsCows(guess, secret) do
    guess |> String.split("", trim: true)
    secret |> String.split("", trim: true)

    Enum.zip(guess, secret) |>
    Enum.reduce({0,0}, fn {g,s}, {bulls,cows} ->
      cond do
        g == s      -> {bulls + 1, cows}
        g in secret -> {bulls, cows + 1}
        true        -> {bulls, cows}
      end
    end)
  end

  def makeSecret(numMap, numsInArr) do
    if numsInArr < 4 do
      newNum = Enum.random(0..9)
      if MapSet.member?(numMap, newNum) do
        makeSecret(numMap, numsInArr)
      else
        makeSecret(MapSet.put(numMap, newNum), numsInArr + 1)
      end
    else
      numMap
    end
  end

end
