defmodule BullsWeb.GameChannel do
  use BullsWeb, :channel

  alias Bulls.Game
  alias Bulls.BackupAgent

  @impl true
  def join("game:" <> _id, payload, socket) do
    if authorized?(payload) do
      game = Bulls.Game.new() #should this be game = Game.new()
      socket = assign(socket, :game, game)
      view = Bulls.Game.view(game) #should this be view = Game.view(game)
      {:ok, view, socket}
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("guess", %{"number" => nn}, socket0) do
    game0 = socket0.assigns[:game]
    game1 = Game.guess(game0, nn)
    socket1 = assign(socket0, :game, game1)
    #BackupAgent.put(socket0.assigns[:name], game1)
    view = Game.view(game1)
    {:reply, {:ok, view}, socket1}
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (game:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast socket, "shout", payload
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
